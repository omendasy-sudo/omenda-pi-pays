import { NextRequest, NextResponse } from "next/server";

type KycStatus = "pending" | "approved" | "rejected";

type KycDoc = {
  name: string;
  type: "id-front" | "id-back" | "business-license" | "selfie" | "proof-address";
  url: string;
};

type KycAudit = {
  at: string;
  by: string;
  action: "viewed" | "approved" | "rejected";
  note?: string;
};

type KycRecord = {
  id: string;
  business: string;
  owner: string;
  license: string;
  idType: string;
  idNumber: string;
  country: string;
  submittedAt: string;
  reviewed: boolean;
  reviewedAt?: string;
  reviewedBy?: string;
  documents: KycDoc[];
  audits: KycAudit[];
  status: KycStatus;
};

const kycRecords: KycRecord[] = [
  {
    id: "kyc-1",
    business: "Amina Stays",
    owner: "@AminaK",
    license: "LIC-7721",
    idType: "National ID",
    idNumber: "TZ-IDA-2291772",
    country: "Tanzania",
    submittedAt: "2026-03-08T08:30:00Z",
    reviewed: false,
    documents: [
      { name: "National ID Front", type: "id-front", url: "/uploads/kyc/kyc-1-id-front.jpg" },
      { name: "National ID Back", type: "id-back", url: "/uploads/kyc/kyc-1-id-back.jpg" },
      { name: "Business License", type: "business-license", url: "/uploads/kyc/kyc-1-license.pdf" },
      { name: "Selfie Verification", type: "selfie", url: "/uploads/kyc/kyc-1-selfie.jpg" },
    ],
    audits: [],
    status: "pending",
  },
  {
    id: "kyc-2",
    business: "John Utilities",
    owner: "@JohnM",
    license: "LIC-9921",
    idType: "Passport",
    idNumber: "P-AR772193",
    country: "Kenya",
    submittedAt: "2026-03-08T09:00:00Z",
    reviewed: false,
    documents: [
      { name: "Passport Photo Page", type: "id-front", url: "/uploads/kyc/kyc-2-passport.jpg" },
      { name: "Business License", type: "business-license", url: "/uploads/kyc/kyc-2-license.pdf" },
      { name: "Proof of Address", type: "proof-address", url: "/uploads/kyc/kyc-2-address.pdf" },
    ],
    audits: [],
    status: "pending",
  },
  {
    id: "kyc-3",
    business: "Peter Fashion",
    owner: "@PeterN",
    license: "LIC-2244",
    idType: "National ID",
    idNumber: "KE-ID-7842218",
    country: "Kenya",
    submittedAt: "2026-03-07T14:00:00Z",
    reviewed: true,
    reviewedAt: "2026-03-07T14:15:00Z",
    reviewedBy: "admin",
    documents: [
      { name: "National ID Front", type: "id-front", url: "/uploads/kyc/kyc-3-id-front.jpg" },
      { name: "Business License", type: "business-license", url: "/uploads/kyc/kyc-3-license.pdf" },
    ],
    audits: [
      { at: "2026-03-07T14:15:00Z", by: "admin", action: "viewed" },
      { at: "2026-03-07T14:16:00Z", by: "admin", action: "approved" },
    ],
    status: "approved",
  },
  {
    id: "kyc-4",
    business: "Fatma Foods",
    owner: "@FatmaH",
    license: "LIC-3902",
    idType: "Driving License",
    idNumber: "TZ-DL-004882",
    country: "Tanzania",
    submittedAt: "2026-03-08T11:00:00Z",
    reviewed: false,
    documents: [
      { name: "Driving License Front", type: "id-front", url: "/uploads/kyc/kyc-4-dl-front.jpg" },
      { name: "Business License", type: "business-license", url: "/uploads/kyc/kyc-4-license.pdf" },
      { name: "Selfie Verification", type: "selfie", url: "/uploads/kyc/kyc-4-selfie.jpg" },
    ],
    audits: [],
    status: "pending",
  },
];

export async function GET() {
  return NextResponse.json({ records: kycRecords, total: kycRecords.length });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const id = String(body?.id || "");
    const action = String(body?.action || "");
    const admin = String(body?.admin || "admin");
    const note = body?.note ? String(body.note) : undefined;
    const now = new Date().toISOString();

    if (action === "view") {
      const row = kycRecords.find((r) => r.id === id);
      if (!row) {
        return NextResponse.json({ ok: false, message: "KYC record not found" }, { status: 404 });
      }
      row.reviewed = true;
      row.reviewedAt = now;
      row.reviewedBy = admin;
      row.audits.push({ at: now, by: admin, action: "viewed", note });
      return NextResponse.json({ ok: true, record: row, records: kycRecords });
    }

    if (action === "approve-all") {
      for (const row of kycRecords) {
        if (row.status === "pending" && row.reviewed) {
          row.status = "approved";
          row.audits.push({ at: now, by: admin, action: "approved" });
        }
      }
      return NextResponse.json({ ok: true, records: kycRecords });
    }

    const row = kycRecords.find((r) => r.id === id);
    if (!row) {
      return NextResponse.json({ ok: false, message: "KYC record not found" }, { status: 404 });
    }

    if ((action === "approve" || action === "reject") && !row.reviewed) {
      return NextResponse.json(
        { ok: false, message: "Review KYC documents and ID before approval/rejection" },
        { status: 409 }
      );
    }

    if (action === "approve") {
      row.status = "approved";
      row.audits.push({ at: now, by: admin, action: "approved", note });
    }
    if (action === "reject") {
      row.status = "rejected";
      row.audits.push({ at: now, by: admin, action: "rejected", note });
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ ok: false, message: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, record: row, records: kycRecords });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }
}
