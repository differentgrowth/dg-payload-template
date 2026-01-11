import { describe, expect, it } from "vitest";

import { contactEmailSchema } from "@/lib/zod";

describe("contactEmailSchema", () => {
  const validData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "612345678",
    message: "Hello, this is a test message",
    privacyCheck: true,
    email2: null,
  };

  it("validates correct data", () => {
    const result = contactEmailSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("name field", () => {
    it("rejects empty name", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        name: "",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Introduce tu nombre por favor."
        );
      }
    });

    it("trims whitespace from name", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        name: "  John Doe  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
      }
    });

    it("rejects name with only whitespace", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        name: "   ",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("email field", () => {
    it("rejects invalid email format", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        email: "invalid-email",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Introduce un email válido por favor."
        );
      }
    });

    it("converts email to lowercase", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        email: "JOHN@EXAMPLE.COM",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("john@example.com");
      }
    });

    it("rejects email with leading/trailing whitespace", () => {
      // Zod 4 email validation happens before trim, so emails with whitespace fail
      const result = contactEmailSchema.safeParse({
        ...validData,
        email: "  john@example.com  ",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("phone field", () => {
    it("rejects phone with less than 9 digits", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        phone: "12345678",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Introduce tu teléfono por favor."
        );
      }
    });

    it("accepts phone with exactly 9 digits", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        phone: "612345678",
      });
      expect(result.success).toBe(true);
    });

    it("accepts phone with more than 9 digits", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        phone: "34612345678",
      });
      expect(result.success).toBe(true);
    });

    it("trims whitespace from phone", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        phone: "  612345678  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.phone).toBe("612345678");
      }
    });
  });

  describe("message field", () => {
    it("allows null message", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        message: null,
      });
      expect(result.success).toBe(true);
    });

    it("trims whitespace from message", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        message: "  Hello World  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.message).toBe("Hello World");
      }
    });
  });

  describe("privacyCheck field", () => {
    it("rejects when privacyCheck is false", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        privacyCheck: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Debes aceptar la política de privacidad"
        );
      }
    });

    it("accepts when privacyCheck is true", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        privacyCheck: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe("email2 honeypot field", () => {
    it("allows null email2 (honeypot)", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        email2: null,
      });
      expect(result.success).toBe(true);
    });

    it("allows empty string email2 (honeypot)", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        email2: "",
      });
      expect(result.success).toBe(true);
    });

    it("rejects non-empty email2 (bot detection)", () => {
      const result = contactEmailSchema.safeParse({
        ...validData,
        email2: "bot@spam.com",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("¿Eres un bot?");
      }
    });
  });
});
