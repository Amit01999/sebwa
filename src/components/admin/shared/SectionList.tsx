import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Trash2, Pencil, Plus, Eye, EyeOff } from "lucide-react";
import { api, ApiError } from "@/lib/admin/api-client";
import type { Page, Section } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { SaveBar } from "@/components/admin/shared/SaveBar";

import {
  HeroSectionEditor,
  type HeroData,
} from "@/components/admin/section-editors/HeroSectionEditor";
import {
  PageHeroSectionEditor,
  type PageHeroData,
} from "@/components/admin/section-editors/PageHeroSectionEditor";
import {
  AboutSectionEditor,
  type AboutData,
} from "@/components/admin/section-editors/AboutSectionEditor";
import {
  ProgramsGridSectionEditor,
  type ProgramsGridData,
} from "@/components/admin/section-editors/ProgramsGridSectionEditor";
import {
  WhyWaceSectionEditor,
  type WhyWaceData,
} from "@/components/admin/section-editors/WhyWaceSectionEditor";
import {
  UniversitiesGridSectionEditor,
  type UniversitiesGridData,
} from "@/components/admin/section-editors/UniversitiesGridSectionEditor";
import {
  CtaSectionEditor,
  type CtaData,
} from "@/components/admin/section-editors/CtaSectionEditor";
import {
  RichContentSectionEditor,
  type RichContentData,
} from "@/components/admin/section-editors/RichContentSectionEditor";
import {
  LeadFormSectionEditor,
  type LeadFormData,
} from "@/components/admin/section-editors/LeadFormSectionEditor";

const SECTION_TYPE_LABELS: Record<Section["type"], string> = {
  hero: "Hero",
  pageHero: "Page hero / breadcrumb",
  about: "About",
  programsGrid: "Programs grid",
  whyWace: "Why WACE",
  universitiesGrid: "Universities grid",
  cta: "Call to action",
  richContent: "Rich content",
  leadForm: "Lead / contact form",
};

function defaultDataFor(type: Section["type"]): Record<string, unknown> {
  switch (type) {
    case "hero":
      return { backgroundImage: "", eyebrowLines: [], heading: "", ctaLabel: "", ctaHref: "" };
    case "pageHero":
      return { title: "" };
    case "about":
      return { eyebrow: "", lead: "", bullets: [] };
    case "programsGrid":
      return { heading: "", heroImage: "", icon: "", items: [] };
    case "whyWace":
      return { heading: "", paragraph: "", bullets: [] };
    case "universitiesGrid":
      return { heading: "", rows: [] };
    case "cta":
      return { heading: "", ctaLabel: "", ctaHref: "" };
    case "richContent":
      return { intro: "", blocks: [] };
    case "leadForm":
      return { variant: "contact", heading: "", intro: "" };
  }
}

export function SectionList({ page }: { page: Page }) {
  const [editing, setEditing] = useState<Section | null>(null);
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin", "pages", page.slug] });

  const reorder = useMutation({
    mutationFn: (order: string[]) =>
      api.patch(`/api/admin/pages/${page.slug}/sections/reorder`, { order }),
    onSuccess: invalidate,
    onError: () => toast.error("Could not reorder sections"),
  });

  const toggleVisible = useMutation({
    mutationFn: ({ sectionId, visible }: { sectionId: string; visible: boolean }) =>
      api.patch(`/api/admin/pages/${page.slug}/sections/${sectionId}`, { visible }),
    onSuccess: invalidate,
    onError: () => toast.error("Could not update visibility"),
  });

  const deleteSection = useMutation({
    mutationFn: (sectionId: string) =>
      api.delete(`/api/admin/pages/${page.slug}/sections/${sectionId}`),
    onSuccess: () => {
      invalidate();
      toast.success("Section deleted");
    },
    onError: () => toast.error("Could not delete section"),
  });

  const addSection = useMutation({
    mutationFn: (type: Section["type"]) =>
      api.post(`/api/admin/pages/${page.slug}/sections`, { type, data: defaultDataFor(type) }),
    onSuccess: () => {
      invalidate();
      toast.success("Section added");
    },
    onError: () => toast.error("Could not add section"),
  });

  const sorted = [...page.sections].sort((a, b) => a.order - b.order);

  const moveBy = (sectionId: string, delta: number) => {
    const index = sorted.findIndex((s) => s._id === sectionId);
    const target = index + delta;
    if (target < 0 || target >= sorted.length) return;
    const next = [...sorted];
    [next[index], next[target]] = [next[target], next[index]];
    reorder.mutate(next.map((s) => s._id));
  };

  return (
    <div className="space-y-3">
      {sorted.map((section, index) => (
        <div
          key={section._id}
          className="flex items-center justify-between rounded-md border border-border p-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{SECTION_TYPE_LABELS[section.type]}</span>
            {!section.visible && <span className="text-xs text-muted-foreground">(hidden)</span>}
          </div>
          <div className="flex items-center gap-1">
            <Switch
              checked={section.visible}
              onCheckedChange={(visible) =>
                toggleVisible.mutate({ sectionId: section._id, visible })
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={index === 0}
              onClick={() => moveBy(section._id, -1)}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={index === sorted.length - 1}
              onClick={() => moveBy(section._id, 1)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={() => setEditing(section)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <ConfirmDialog
              trigger={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
              title="Delete this section?"
              description="This cannot be undone."
              onConfirm={() => deleteSection.mutate(section._id)}
            />
          </div>
        </div>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline">
            <Plus className="h-4 w-4" /> Add section
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {(Object.keys(SECTION_TYPE_LABELS) as Section["type"][]).map((type) => (
            <DropdownMenuItem key={type} onClick={() => addSection.mutate(type)}>
              {SECTION_TYPE_LABELS[type]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {editing && (
        <SectionEditSheet slug={page.slug} section={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

function SectionEditSheet({
  slug,
  section,
  onClose,
}: {
  slug: string;
  section: Section;
  onClose: () => void;
}) {
  const [data, setData] = useState<Record<string, unknown>>(section.data);
  const queryClient = useQueryClient();

  const save = useMutation({
    mutationFn: () => api.patch(`/api/admin/pages/${slug}/sections/${section._id}`, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pages", slug] });
      toast.success("Section saved");
      onClose();
    },
    onError: (error) => {
      const message = error instanceof ApiError ? error.message : "Could not save section";
      toast.error(message);
    },
  });

  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{SECTION_TYPE_LABELS[section.type]}</SheetTitle>
          <SheetDescription>Changes save to this page only once you click Save.</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <SectionDataEditor type={section.type} data={data} onChange={setData} />
        </div>
        <div className="mt-6">
          <SaveBar onSave={() => save.mutate()} onCancel={onClose} saving={save.isPending} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SectionDataEditor({
  type,
  data,
  onChange,
}: {
  type: Section["type"];
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
}) {
  switch (type) {
    case "hero":
      return (
        <HeroSectionEditor
          value={data as unknown as HeroData}
          onChange={onChange as (v: HeroData) => void}
        />
      );
    case "pageHero":
      return (
        <PageHeroSectionEditor
          value={data as unknown as PageHeroData}
          onChange={onChange as (v: PageHeroData) => void}
        />
      );
    case "about":
      return (
        <AboutSectionEditor
          value={data as unknown as AboutData}
          onChange={onChange as (v: AboutData) => void}
        />
      );
    case "programsGrid":
      return (
        <ProgramsGridSectionEditor
          value={data as unknown as ProgramsGridData}
          onChange={onChange as (v: ProgramsGridData) => void}
        />
      );
    case "whyWace":
      return (
        <WhyWaceSectionEditor
          value={data as unknown as WhyWaceData}
          onChange={onChange as (v: WhyWaceData) => void}
        />
      );
    case "universitiesGrid":
      return (
        <UniversitiesGridSectionEditor
          value={data as unknown as UniversitiesGridData}
          onChange={onChange as (v: UniversitiesGridData) => void}
        />
      );
    case "cta":
      return (
        <CtaSectionEditor
          value={data as unknown as CtaData}
          onChange={onChange as (v: CtaData) => void}
        />
      );
    case "richContent":
      return (
        <RichContentSectionEditor
          value={data as unknown as RichContentData}
          onChange={onChange as (v: RichContentData) => void}
        />
      );
    case "leadForm":
      return (
        <LeadFormSectionEditor
          value={data as unknown as LeadFormData}
          onChange={onChange as (v: LeadFormData) => void}
        />
      );
  }
}
