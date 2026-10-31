import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { api } from "@/lib/admin/api-client";
import type { SiteSettings } from "@/lib/admin/queries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ImagePicker } from "@/components/admin/blocks/ImagePicker";
import { SaveBar } from "@/components/admin/shared/SaveBar";

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [value, setValue] = useState<SiteSettings>(settings);
  const queryClient = useQueryClient();

  const save = useMutation({
    mutationFn: () => api.put("/api/admin/settings", value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
      toast.success("Settings saved");
    },
    onError: () => toast.error("Could not save settings"),
  });

  return (
    <div className="space-y-6">
      <section className="space-y-3 rounded-md border border-border p-4">
        <h3 className="font-medium">Contact</h3>
        <div className="space-y-2">
          <Label className="text-xs">Phone numbers</Label>
          {value.contact.phones.map((phone, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={phone}
                onChange={(e) =>
                  setValue({
                    ...value,
                    contact: {
                      ...value.contact,
                      phones: value.contact.phones.map((p, j) => (j === i ? e.target.value : p)),
                    },
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setValue({
                    ...value,
                    contact: {
                      ...value.contact,
                      phones: value.contact.phones.filter((_, j) => j !== i),
                    },
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setValue({
                ...value,
                contact: { ...value.contact, phones: [...value.contact.phones, ""] },
              })
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add phone
          </Button>
        </div>
        <div>
          <Label className="text-xs">Email</Label>
          <Input
            value={value.contact.email}
            onChange={(e) =>
              setValue({ ...value, contact: { ...value.contact, email: e.target.value } })
            }
          />
        </div>
        <div>
          <Label className="text-xs">Address</Label>
          <Textarea
            value={value.contact.address}
            onChange={(e) =>
              setValue({ ...value, contact: { ...value.contact, address: e.target.value } })
            }
            rows={2}
          />
        </div>
        <div>
          <Label className="text-xs">Hours</Label>
          <Input
            value={value.contact.hours}
            onChange={(e) =>
              setValue({ ...value, contact: { ...value.contact, hours: e.target.value } })
            }
          />
        </div>
      </section>

      <section className="space-y-3 rounded-md border border-border p-4">
        <h3 className="font-medium">Social links</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs">Facebook</Label>
            <Input
              value={value.social.facebook}
              onChange={(e) =>
                setValue({ ...value, social: { ...value.social, facebook: e.target.value } })
              }
            />
          </div>
          <div>
            <Label className="text-xs">Instagram</Label>
            <Input
              value={value.social.instagram}
              onChange={(e) =>
                setValue({ ...value, social: { ...value.social, instagram: e.target.value } })
              }
            />
          </div>
          <div>
            <Label className="text-xs">YouTube</Label>
            <Input
              value={value.social.youtube}
              onChange={(e) =>
                setValue({ ...value, social: { ...value.social, youtube: e.target.value } })
              }
            />
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-md border border-border p-4">
        <h3 className="font-medium">Footer navigation links</h3>
        {value.footer.navLinks.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={link.label}
              placeholder="Label"
              onChange={(e) =>
                setValue({
                  ...value,
                  footer: {
                    ...value.footer,
                    navLinks: value.footer.navLinks.map((l, j) =>
                      j === i ? { ...l, label: e.target.value } : l,
                    ),
                  },
                })
              }
            />
            <Input
              value={link.href}
              placeholder="/path or URL"
              onChange={(e) =>
                setValue({
                  ...value,
                  footer: {
                    ...value.footer,
                    navLinks: value.footer.navLinks.map((l, j) =>
                      j === i ? { ...l, href: e.target.value } : l,
                    ),
                  },
                })
              }
            />
            <Switch
              checked={link.visible}
              onCheckedChange={(visible) =>
                setValue({
                  ...value,
                  footer: {
                    ...value.footer,
                    navLinks: value.footer.navLinks.map((l, j) =>
                      j === i ? { ...l, visible } : l,
                    ),
                  },
                })
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                setValue({
                  ...value,
                  footer: {
                    ...value.footer,
                    navLinks: value.footer.navLinks.filter((_, j) => j !== i),
                  },
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setValue({
              ...value,
              footer: {
                ...value.footer,
                navLinks: [
                  ...value.footer.navLinks,
                  { label: "", href: "", order: value.footer.navLinks.length, visible: true },
                ],
              },
            })
          }
        >
          <Plus className="h-3.5 w-3.5" /> Add link
        </Button>
      </section>

      <section className="space-y-3 rounded-md border border-border p-4">
        <h3 className="font-medium">Accreditation logos</h3>
        {value.footer.accreditationLogos.map((logo, i) => (
          <div key={i} className="flex items-center gap-2">
            <ImagePicker
              value={logo.mediaAsset}
              onChange={(mediaAsset) =>
                setValue({
                  ...value,
                  footer: {
                    ...value.footer,
                    accreditationLogos: value.footer.accreditationLogos.map((l, j) =>
                      j === i ? { ...l, mediaAsset } : l,
                    ),
                  },
                })
              }
            />
            <Input
              value={logo.alt}
              placeholder="Alt text"
              onChange={(e) =>
                setValue({
                  ...value,
                  footer: {
                    ...value.footer,
                    accreditationLogos: value.footer.accreditationLogos.map((l, j) =>
                      j === i ? { ...l, alt: e.target.value } : l,
                    ),
                  },
                })
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                setValue({
                  ...value,
                  footer: {
                    ...value.footer,
                    accreditationLogos: value.footer.accreditationLogos.filter((_, j) => j !== i),
                  },
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setValue({
              ...value,
              footer: {
                ...value.footer,
                accreditationLogos: [
                  ...value.footer.accreditationLogos,
                  { alt: "", order: value.footer.accreditationLogos.length },
                ],
              },
            })
          }
        >
          <Plus className="h-3.5 w-3.5" /> Add logo
        </Button>
      </section>

      <section className="space-y-3 rounded-md border border-border p-4">
        <h3 className="font-medium">SEO defaults</h3>
        <div>
          <Label className="text-xs">Title suffix</Label>
          <Input
            value={value.seoDefaults.titleSuffix}
            onChange={(e) =>
              setValue({
                ...value,
                seoDefaults: { ...value.seoDefaults, titleSuffix: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label className="text-xs">Default social share image</Label>
          <ImagePicker
            value={value.seoDefaults.defaultOgImage}
            onChange={(defaultOgImage) =>
              setValue({ ...value, seoDefaults: { ...value.seoDefaults, defaultOgImage } })
            }
          />
        </div>
      </section>

      <SaveBar onSave={() => save.mutate()} saving={save.isPending} />
    </div>
  );
}
