"use client";

import { cn } from "@/lib/utils";
import { FORM_INPUT_CLASS, FORM_LABEL_CLASS } from "@/lib/form-styles";

interface ContactData {
  firstName: string;
  email: string;
  phone: string;
  contactMethod: string;
}

interface ContactStepProps {
  data: ContactData;
  update: (field: keyof ContactData, value: string) => void;
  errors: Partial<Record<keyof ContactData, string>>;
}

export function ContactStep({ data, update, errors }: ContactStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Let's start with the basics.</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We'll use this to reach out if we're a good fit.
        </p>
      </div>
      <div>
        <label className={FORM_LABEL_CLASS}>First name</label>
        <input
          type="text"
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          className={cn(FORM_INPUT_CLASS, errors.firstName ? "border-red-400" : "")}
          placeholder="Alex"
          autoFocus
        />
        {errors.firstName && (
          <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
        )}
      </div>
      <div>
        <label className={FORM_LABEL_CLASS}>Email address</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          className={cn(FORM_INPUT_CLASS, errors.email ? "border-red-400" : "")}
          placeholder="alex@company.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>
      <div>
        <label className={FORM_LABEL_CLASS}>Phone number</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={cn(FORM_INPUT_CLASS, errors.phone ? "border-red-400" : "")}
          placeholder="+1 (555) 000-0000"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>
      <div>
        <label className={FORM_LABEL_CLASS}>How should we reach you?</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => update("contactMethod", "imessage")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
              data.contactMethod === "imessage"
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/50"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0e/08/07/0e080793-1b66-d9b3-0bbe-8222669abf79/messages-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.png"
              alt="iMessage"
              width={24}
              height={24}
              className="rounded-md"
            />
            iMessage
          </button>
          <button
            type="button"
            onClick={() => update("contactMethod", "whatsapp")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
              data.contactMethod === "whatsapp"
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/50"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c0/94/ab/c094ab41-a44a-4da8-737f-7aad8d97b8b6/AppIcon-0-0-1x_U007epad-0-0-0-1-0-0-sRGB-0-85-220.png/512x512bb.png"
              alt="WhatsApp"
              width={24}
              height={24}
              className="rounded-md"
            />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
