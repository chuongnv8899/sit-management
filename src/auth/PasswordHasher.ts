export class PasswordHasher {
  async hash(
    password: string,
    saltHex: string,
    iterations: number,
  ): Promise<string> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: this.hexToBytes(saltHex),
        iterations,
      },
      keyMaterial,
      256,
    );

    return this.bytesToHex(new Uint8Array(derivedBits));
  }

  private hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
    const bytes = new Uint8Array(new ArrayBuffer(hex.length / 2));

    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Number.parseInt(
        hex.slice(index * 2, index * 2 + 2),
        16,
      );
    }

    return bytes;
  }

  private bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
      "",
    );
  }
}
