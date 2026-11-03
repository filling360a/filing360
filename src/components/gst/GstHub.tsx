import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CtaBand, PrimaryButton, SecondaryButton } from "@/components/site/PageShell";
import { ReviewedBy } from "@/components/site/ReviewedBy";
import { whatsappLink } from "@/content/company";
import {
  GST,
  GST_HUB_AREAS,
  GST_HUB_CITY,
  GST_HUB_UPDATED,
  amendmentTable,
  compositionTable,
  gstDocsTable,
  gstFaqs,
  gstPrices,
  gstThresholdTable,
  gstToc,
  gstTypesTable,
  gstWhy,
  penaltyTable,
  refundTable,
  returnsTable,
  type HubTable,
} from "@/content/gstHub";
import { formatInr, type Pillar } from "@/content/services";

function fee(amount: number | null, per?: string) {
  if (amount === null) return "On request";
  return per ? `${formatInr(amount)} / ${per}` : formatInr(amount);
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  const cls = "font-semibold text-[#0e7b5b] underline decoration-[#8ecfbc] underline-offset-2 hover:text-[#0b6550]";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-[22px] font-bold tracking-tight text-[#0f2a45] md:text-[28px]">
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-7 text-[17px] font-bold tracking-tight text-[#0f2a45] md:text-[19px]">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[15.5px] leading-[1.7] text-[#2c3f4e]">{children}</p>;
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15.5px] leading-[1.65] text-[#2c3f4e]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e3f2ed] text-[13px] font-bold text-[#0e7b5b]">
            {i + 1}
          </span>
          <p className="text-[15.5px] leading-[1.65] text-[#2c3f4e]">
            <strong className="font-semibold text-[#0f2a45]">{item.title}:</strong> {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

function Table({ data }: { data: HubTable }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d7e4de] bg-white">
      <table className="w-full min-w-[560px] text-left text-[14.5px]">
        <thead className="bg-[#eef4f1] text-[#0f2a45]">
          <tr>
            {data.columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#d7e4de]">
          {data.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={`${row[0]}-${i}`} className={`px-4 py-3 leading-relaxed text-[#2c3f4e] ${i === 0 ? "font-semibold text-[#0f2a45]" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.note ? <p className="border-t border-[#d7e4de] px-4 py-3 text-[13.5px] leading-relaxed text-[#5b6e7a]">{data.note}</p> : null}
    </div>
  );
}

function Figure({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
      <div className="relative aspect-[16/9] w-full bg-[#eef4f1]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover object-center" />
      </div>
      <figcaption className="px-4 py-2.5 text-[13px] text-[#5b6e7a]">{alt}</figcaption>
    </figure>
  );
}

const packages: { name: string; includes: string; price: string; href: string }[] = [
  { name: "GST Registration", includes: "Application, ARN tracking, query replies, GST certificate", price: fee(gstPrices.registration), href: GST.reg },
  { name: "GST Refund", includes: "RFD-01 filing with statements and reconciliation", price: fee(gstPrices.refund), href: "/book-consultation" },
  { name: "GST Notice Reply", includes: "Review, reconciliation, drafted reply and filing", price: fee(gstPrices.notice), href: GST.blogNotice },
  { name: "GST Return Filing – Monthly", includes: "GSTR-1, GSTR-3B, GSTR-2B reconciliation", price: fee(gstPrices.monthly, "month"), href: GST.returns },
  { name: "GST Return Filing – Composition", includes: "CMP-08 for 4 quarters + GSTR-4", price: fee(gstPrices.compositionYear, "year"), href: GST.composition },
  { name: "GST Annual Return", includes: "GSTR-9 (+ GSTR-9C if applicable)", price: fee(gstPrices.annual), href: GST.annual },
  { name: "LUT Filing", includes: "RFD-11 filing for one financial year", price: fee(gstPrices.lut), href: GST.lut },
  { name: "Amendment / Cancellation / Revocation", includes: "REG-14 / REG-16 / REG-21 with documentation", price: `${fee(gstPrices.amendment)} each`, href: GST.amend },
];

export function GstHub({ pillar }: { pillar: Pillar }) {
  const updated = new Date(`${GST_HUB_UPDATED}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-5 pt-6 md:px-8 md:pt-8">
        <ReviewedBy className="text-[13.5px] text-[#5b6e7a]" suffix={`· Updated ${updated} · Fees exclusive of GST`} />

        <nav aria-label="On this page" className="mt-4 overflow-x-auto rounded-2xl border border-[#d7e4de] bg-white p-4 md:p-5">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">On this page</p>
          <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            {gstToc.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="font-semibold text-[#0f2a45] hover:text-[#0e7b5b]">
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <article className="mx-auto max-w-[800px] px-5 py-8 md:px-8 md:py-12">
        <H2 id="what-is-gst">What is GST?</H2>
        <P>
          Goods and Services Tax (GST) is a destination-based indirect tax levied on the supply of goods and services in India. It came into force on 1 July 2017 under the Central GST Act, 2017, and replaced taxes such as VAT, excise duty, service tax and entry tax. Because tax paid on purchases (input tax credit) is set off against tax on sales, GST removes the cascading effect of “tax on tax”.
        </P>

        <H3>Types of GST</H3>
        <Table data={gstTypesTable} />

        <H3>GST rate structure</H3>
        <P>
          After the GST rate rationalisation effective 22 September 2025, most goods and services fall into two main slabs: 5% (merit rate) and 18% (standard rate). A 40% rate applies to select luxury and sin goods, essentials remain at nil, and special rates apply to items such as gold (3%). Always check the current rate for your HSN or SAC code before invoicing — or use our{" "}
          <A href={GST.calc}>GST calculator</A>.
        </P>

        <H3>What is a GSTIN?</H3>
        <P>
          A GSTIN is the 15-digit GST Identification Number issued on registration. The first 2 digits are the state code, the next 10 are the PAN, the 13th is the entity number for that PAN in the state, the 14th is “Z” by default, and the 15th is a check digit.
        </P>

        <H2 id="gst-registration-online">GST Registration Online</H2>
        <P>
          GST registration is mandatory once your aggregate turnover crosses the threshold for your state and type of supply, and you must apply within 30 days of becoming liable. Filing360 prepares and files your application, tracks queries from the officer and delivers your GST certificate. See the full walkthrough in{" "}
          <A href={GST.blogReg}>how to get a GST number online</A>.
        </P>
        <Figure src="/images/otherpageshero/bfe4f45b-e65b-41db-a592-8fce7b9ea822.png" alt="GST registration process by Filing360" />

        <H3>GST registration threshold limit</H3>
        <Table data={gstThresholdTable} />

        <H3>Who must register regardless of turnover</H3>
        <Bullets
          items={[
            "Persons making inter-state taxable supply of goods",
            "Casual taxable persons and non-resident taxable persons",
            "Persons liable to pay tax under reverse charge (RCM)",
            "E-commerce operators, and sellers supplying goods through e-commerce platforms",
            "Input Service Distributors (ISD)",
            "Persons required to deduct TDS or collect TCS under GST",
            "Agents supplying on behalf of registered principals",
            "Suppliers of online information and database access (OIDAR) services from outside India to unregistered persons in India",
          ]}
        />

        <H3>Voluntary GST registration</H3>
        <P>
          Businesses below the threshold can register voluntarily. Benefits include claiming input tax credit, selling to B2B buyers who want ITC, listing on marketplaces like Amazon and Flipkart, and building credibility with banks and large clients.
        </P>

        <H3>GST registration for freelancers, small businesses and online sellers</H3>
        <Bullets
          items={[
            <>
              <strong>Freelancers and consultants:</strong> registration is required once receipts cross ₹20 lakh, including income from foreign clients. Exports of services are zero-rated, and with an LUT you invoice foreign clients without GST. Read{" "}
              <A href={GST.blogFreelance}>GST for freelancers</A>.
            </>,
            <>
              <strong>Small businesses and shops:</strong> below the threshold, registration is optional, but many register to supply larger B2B buyers. Eligible small businesses can also choose the <A href={GST.guide}>composition scheme</A> to pay a low fixed rate.
            </>,
            <>
              <strong>Online sellers on Amazon, Flipkart and Meesho:</strong> sellers of goods through e-commerce operators generally need GST registration from the first sale, subject to limited relaxations for small intra-state sellers. Marketplaces usually ask for a GSTIN before listing.
            </>,
          ]}
        />

        <H3>Documents required for GST registration</H3>
        <Table data={gstDocsTable} />

        <H3>How to apply for a GST number online: step-by-step process</H3>
        <Steps
          items={[
            { title: "Consultation", body: "a CA reviews your business, state and supply type and confirms the right registration category." },
            { title: "Document collection", body: "you upload scanned documents on our secure portal or WhatsApp." },
            { title: "Part A of Form GST REG-01", body: "PAN, mobile and email are verified by OTP and a Temporary Reference Number (TRN) is generated." },
            { title: "Part B of Form GST REG-01", body: "business details, promoters, place of business, goods/services (HSN/SAC) and bank details are filed." },
            { title: "Aadhaar or biometric authentication", body: "done online, or at a GST Suvidha Kendra where the portal requires it." },
            { title: "ARN generation", body: "an Application Reference Number is issued to track status." },
            { title: "Officer review", body: "queries, if any, are raised in Form GST REG-03 and answered in REG-04 within 7 working days." },
            { title: "GST certificate", body: "approval in Form GST REG-06 with your GSTIN." },
          ]}
        />

        <H3>How long does GST registration take?</H3>
        <P>
          Approval is usually granted within 7 working days of the application. Where Aadhaar authentication is not opted for, or the officer orders physical verification of premises, it can take up to 30 days.
        </P>

        <H3>GST registration status check and certificate download</H3>
        <Bullets
          items={[
            <>
              <strong>Check status:</strong> on the <A href={GST.portal}>GST portal</A>, go to Services → Registration → Track Application Status and enter your ARN. The status shows as Pending for Processing, Pending for Clarification, Approved or Rejected.
            </>,
            <>
              <strong>Download certificate:</strong> after approval, log in and go to Services → User Services → View/Download Certificates to download Form REG-06.
            </>,
            <>
              <strong>Search a GSTIN:</strong> anyone can verify a supplier’s GST number under Search Taxpayer → Search by GSTIN/UIN.
            </>,
          ]}
        />

        <H3>GST registration fees and charges</H3>
        <P>
          The government charges no fee for GST registration. Filing360’s professional fee for registration is {formatInr(gstPrices.registration)}, exclusive of GST, covering documentation, filing and query handling.{" "}
          <A href={GST.reg}>Get GST registration</A>.
        </P>

        <H2 id="gst-schemes">GST Schemes for Small Businesses</H2>
        <P>
          Two schemes reduce the compliance load for small taxpayers: the Composition Scheme (lower tax, fewer returns) and the QRMP Scheme (quarterly returns, monthly tax). Filing360 checks your eligibility and helps you opt in or out at the right time.
        </P>

        <H3>GST Composition Scheme</H3>
        <P>
          The Composition Scheme under Section 10 lets small businesses pay tax at a flat percentage of turnover and file one quarterly statement instead of monthly returns. Compare it with the regular scheme in our{" "}
          <A href={GST.guide}>composition vs regular GST guide</A>.
        </P>
        <Table data={compositionTable} />
        <P>
          <strong>Who cannot opt for composition:</strong> manufacturers of notified goods (such as ice cream, pan masala and tobacco), inter-state suppliers of goods, casual and non-resident taxable persons, suppliers through e-commerce operators who collect TCS (relaxations apply to some small suppliers), and suppliers of non-taxable goods.
        </P>
        <P>Key conditions:</P>
        <Bullets
          items={[
            "No input tax credit can be claimed.",
            "Tax cannot be collected from customers; a bill of supply is issued instead of a tax invoice.",
            "“Composition taxable person” must be displayed on the signboard and on every bill.",
            "To opt in, file Form GST CMP-02 before the start of the financial year (new registrants choose it in REG-01).",
          ]}
        />
        <P>
          Pros: lower tax outgo, fewer returns, simpler books. Cons: no ITC, no inter-state sales of goods, and B2B buyers cannot claim credit. Filing for composition dealers starts at {formatInr(gstPrices.compositionYear)} a year —{" "}
          <A href={GST.composition}>composite dealer filing</A>.
        </P>

        <H3>QRMP Scheme (Quarterly Return Monthly Payment)</H3>
        <P>Taxpayers with aggregate turnover up to ₹5 crore can file GSTR-1 and GSTR-3B quarterly while paying tax monthly.</P>
        <Bullets
          items={[
            "Tax for the first two months of a quarter is paid by the 25th of the next month through Form PMT-06, using either the fixed-sum method (35% of last quarter’s cash liability) or the self-assessment method.",
            "The optional Invoice Furnishing Facility (IFF) lets you upload B2B invoices monthly so your buyers get timely ITC.",
            "You can opt in or out on the GST portal from the 1st of the second month of the preceding quarter to the last day of the first month of the quarter.",
          ]}
        />
        <P>
          We file QRMP returns for you — see <A href={GST.qrmp}>QRMP filing</A>.
        </P>

        <H3>Other special registrations</H3>
        <Bullets
          items={[
            <><strong>Casual Taxable Person:</strong> for temporary business at exhibitions or events in another state; valid for up to 90 days with an advance tax deposit.</>,
            <><strong>Non-Resident Taxable Person:</strong> foreign persons supplying occasionally in India.</>,
            <><strong>Input Service Distributor (ISD):</strong> for head offices distributing input service credit to branches (mandatory for common services from 1 April 2025).</>,
            <><strong>TDS/TCS registration:</strong> for government departments deducting tax and e-commerce operators collecting tax.</>,
          ]}
        />

        <H2 id="gst-return-filing">GST Return Filing</H2>
        <P>
          Every registered person must file GST returns even when there is no business in a period (a nil return). Filing360 reconciles your sales, purchases and GSTR-2B every month, then files GSTR-1 and GSTR-3B on time so you keep your input tax credit and avoid late fees. Monthly filing starts at {formatInr(gstPrices.monthly)}.
        </P>
        <Figure src="/images/otherpageshero/45e07ea5-214a-48b7-8cfb-891ea07bd319.png" alt="GST return filing calendar" />

        <H3>Types of GST returns and due dates</H3>
        <Table data={returnsTable} />

        <H3>Recent changes every taxpayer should know</H3>
        <Bullets
          items={[
            <><strong>Invoice Management System (IMS):</strong> buyers can accept, reject or keep pending each supplier invoice before it flows into GSTR-2B.</>,
            <><strong>Hard-locking of GSTR-3B:</strong> liability auto-filled from GSTR-1 can no longer be edited in GSTR-3B; corrections go through GSTR-1A. See <A href={GST.blog13}>GSTR-1 vs GSTR-3B</A>.</>,
            <><strong>Three-year time bar:</strong> returns cannot be filed after three years from their original due date, so old pending returns must be cleared quickly.</>,
            <><strong>E-invoicing:</strong> mandatory for businesses with aggregate turnover above ₹5 crore in any FY since 2017-18, and businesses with turnover of ₹10 crore or more must report each e-invoice within 30 days of its date.</>,
          ]}
        />

        <H3>GSTR-2B and input tax credit</H3>
        <P>
          GSTR-2B is an auto-generated, monthly statement of input tax credit available to you, built from your suppliers’ GSTR-1 and the invoices you accept in the Invoice Management System. Claim ITC in GSTR-3B only up to what appears in GSTR-2B; excess claims lead to DRC-01C notices with interest. Reconciling purchases with GSTR-2B every month is the single most important step in GST return filing.
        </P>

        <H3>E-way bill under GST</H3>
        <P>
          An e-way bill is required for moving goods worth more than ₹50,000 in one consignment, generated on the{" "}
          <A href={GST.eway}>e-way bill portal</A> before the goods move (some states set a higher limit for movement within the state). It is valid for 1 day per 200 km for normal cargo. Moving goods without a valid e-way bill can lead to detention of goods and a penalty.
        </P>

        <H3>Our GST return filing process</H3>
        <Steps
          items={[
            { title: "Share data", body: "you share sales and purchase data monthly (Excel, Tally, Zoho or photos of bills)." },
            { title: "Reconcile", body: "we reconcile purchases with GSTR-2B and IMS and flag missing supplier invoices." },
            { title: "Prepare GSTR-1", body: "we prepare GSTR-1 and share a summary for your approval." },
            { title: "Compute tax", body: "we compute tax liability and ITC and share the challan amount." },
            { title: "File GSTR-3B", body: "we file GSTR-3B after payment and send you the acknowledgement." },
          ]}
        />
        <P>
          Start <A href={GST.returns}>regular GST return filing</A>, or file the year-end{" "}
          <A href={GST.blog9}>GSTR-9 annual return</A>.
        </P>

        <H2 id="gst-amendment">GST Registration Amendment</H2>
        <P>
          Any change in the details given at registration must be updated on the GST portal within 15 days of the change, using Form GST REG-14. Filing360 files the amendment, uploads supporting proofs and replies to officer queries. Professional fee: {formatInr(gstPrices.amendment)} per change request.
        </P>
        <Table data={amendmentTable} />
        <P>
          Documents usually needed: proof of the change (new rent agreement, utility bill, board resolution, revised partnership deed or MCA records), and Aadhaar authentication of the new signatory or partner where applicable.
        </P>
        <P>
          Tip: an outdated mobile number or email means you miss portal notices, so update them promptly.{" "}
          <A href={GST.amend}>File a GST amendment</A>.
        </P>

        <H2 id="gst-cancellation">GST Cancellation</H2>
        <P>
          A GST registration can be cancelled voluntarily by the taxpayer or suo motu by the tax officer. Until cancellation is approved, returns must continue, so close it properly rather than simply stopping filings.
        </P>

        <H3>When can you apply for cancellation?</H3>
        <Bullets
          items={[
            "Business closed, sold, merged, demerged or transferred",
            "Change in constitution leading to a new PAN",
            "Turnover below the threshold and registration no longer required",
            "Death of the proprietor",
            "Voluntary registration no longer needed",
          ]}
        />

        <H3>When can the officer cancel your GSTIN?</H3>
        <Bullets
          items={[
            "Returns not filed for six consecutive months (two consecutive quarters for composition taxpayers)",
            "Business not operating from the declared place",
            "Registration obtained by fraud or wilful misstatement",
            "Invoices issued without actual supply, or excess ITC claimed against GSTR-2B",
            "Composition taxpayer violating scheme conditions",
          ]}
        />

        <H3>GST cancellation process</H3>
        <Steps
          items={[
            { title: "File REG-16", body: "file Form GST REG-16 with the reason, closure date and stock details on that date." },
            { title: "Pay tax on stock", body: "pay tax on stock and capital goods held (ITC reversal) through the electronic ledger." },
            { title: "Order in REG-19", body: "the officer passes an order in Form GST REG-19, usually within 30 days." },
            { title: "File GSTR-10", body: "file the final return GSTR-10 within 3 months of the cancellation order, otherwise a late fee applies." },
          ]}
        />
        <P>
          In a suo motu case, the officer first issues a show cause notice in Form GST REG-17, which must be answered in REG-18 within 7 working days. We file <A href={GST.cancel}>GSTR-10</A> for {formatInr(gstPrices.cancellation)}.
        </P>

        <H2 id="gst-revocation">Revocation of Cancelled GST Registration</H2>
        <P>
          If the officer cancelled your GSTIN on their own, you can apply to restore it through revocation instead of taking a fresh registration. Revocation is not available when you applied for cancellation yourself. Full process:{" "}
          <A href={GST.blogRevoke}>GST revocation of cancelled registration</A>.
        </P>

        <H3>Time limit for revocation</H3>
        <P>
          Apply in Form GST REG-21 within 90 days of the date the cancellation order was served. The Additional or Joint Commissioner can extend this by up to 180 more days on sufficient cause.
        </P>

        <H3>GST revocation process</H3>
        <Steps
          items={[
            { title: "Clear returns", body: "file all pending returns up to the date of cancellation and pay tax, interest and late fees." },
            { title: "File REG-21", body: "file Form GST REG-21 with reasons and supporting documents." },
            { title: "REG-22 or notice", body: "if the officer is satisfied, revocation is granted in Form GST REG-22 and your GSTIN becomes active again. If not, a notice in REG-23 is issued, to be answered in REG-24 within 7 working days." },
            { title: "Appeal", body: "if revocation is rejected, you can file an appeal under Section 107 within 3 months." },
          ]}
        />
        <P>
          Filing360 regularises your pending returns, drafts a strong reply and files the revocation, so your marketplace listings and B2B buyers are not disrupted.{" "}
          <A href={GST.revoke}>GST revocation</A> from {formatInr(gstPrices.revocation)}.
        </P>

        <H2 id="lut-filing">LUT Filing for Exporters (Form GST RFD-11)</H2>
        <P>
          A Letter of Undertaking (LUT) lets exporters of goods or services, and suppliers to SEZ units, make zero-rated supplies without paying IGST. Without an LUT you must pay IGST upfront and claim a refund later, which blocks working capital. Guide:{" "}
          <A href={GST.blogLut}>LUT for export of services</A>.
        </P>

        <H3>Who can file an LUT?</H3>
        <P>
          Any registered person exporting goods or services can furnish an LUT, except a person who has been prosecuted for tax evasion exceeding ₹2.5 crore.
        </P>

        <H3>Key points about LUT</H3>
        <Bullets
          items={[
            "An LUT is valid for one financial year and must be renewed every year, ideally before 31 March for the coming year.",
            "It is filed online in Form GST RFD-11 and is generally accepted instantly on the portal.",
            "Goods must be exported within 3 months of the invoice, and payment for services must be received within the RBI timelines; otherwise IGST with interest becomes payable.",
            "Invoices must carry the note “Supply meant for export / supply to SEZ unit or SEZ developer for authorised operations under Letter of Undertaking without payment of IGST”.",
            "Freelancers, IT companies, consultants and digital agencies with foreign clients benefit the most.",
          ]}
        />

        <H3>Documents for LUT</H3>
        <P>
          GSTIN, PAN, authorised signatory details, Import Export Code (IEC) for exporters of goods, details of two independent witnesses (name, address, occupation), and a DSC or EVC of the authorised signatory.
        </P>

        <H3>Refund of unutilised ITC</H3>
        <P>
          Exporting under LUT lets you claim a refund of accumulated input tax credit through Form GST RFD-01. Filing360 also prepares and files these refund applications.{" "}
          <A href={GST.lut}>File this year’s LUT</A> for {formatInr(gstPrices.lut)}.
        </P>

        <H2 id="gst-refund">GST Refund</H2>
        <P>
          A GST refund can be claimed when you have paid more tax than due or have unused input tax credit that cannot be set off. The application is filed in Form GST RFD-01 within 2 years from the relevant date.
        </P>
        <Table data={refundTable} />
        <P>
          For zero-rated supplies, 90% of the refund can be granted provisionally within 7 days, and the final order is due within 60 days of a complete application; delayed refunds carry interest. Filing360 prepares the statements, reconciles ITC and files refund applications — talk to a CA for a quote.
        </P>

        <H2 id="gst-notice-reply">GST Notice Reply</H2>
        <P>
          Most GST notices are system-generated queries about mismatches between GSTR-1, GSTR-3B and GSTR-2B, scrutiny of returns (ASMT-10), non-filing (GSTR-3A) or proposed cancellation (REG-17). Each has a fixed reply window, often only 7 to 30 days. Filing360’s CAs review the notice, reconcile your data, draft a point-by-point reply with supporting documents and file it on the portal, so a small query does not become a tax demand or cancellation. Read{" "}
          <A href={GST.blogNotice}>how to reply to a GST notice</A>, then book a free 15-minute call.
        </P>

        <H2 id="gst-penalties">GST Penalties, Late Fees and Interest</H2>
        <P>Late or missed GST compliance costs far more than a professional’s fee.</P>
        <Table data={penaltyTable} />

        <H2 id="gst-compliance-tips">GST compliance tips from our CAs</H2>
        <Bullets
          items={[
            "Reconcile purchases with GSTR-2B every month before filing GSTR-3B, and claim ITC only on invoices that appear there.",
            "Use the Invoice Management System to reject wrong supplier invoices on time.",
            "Pay suppliers within 180 days, or the ITC claimed must be reversed with interest.",
            "Generate e-way bills for movement of goods above ₹50,000.",
            "Keep books and records for at least 72 months from the annual return due date.",
            "Respond to every portal notice (DRC-01, ASMT-10, REG-17) within the time allowed.",
          ]}
        />

        <H2 id="why-filing360">Why Choose Filing360 for GST?</H2>
        <P>
          Filing360 is run by qualified Chartered Accountants, so your GST work is handled by professionals, not data-entry agents.
        </P>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {gstWhy.map((item) => (
            <li key={item.title} className="rounded-2xl border border-[#d7e4de] bg-white p-4">
              <p className="font-bold text-[#0f2a45]">{item.title}</p>
              <p className="mt-1 text-[14.5px] leading-relaxed text-[#5b6e7a]">{item.body}</p>
            </li>
          ))}
        </ul>

        <H2 id="gst-services-in-delhi">GST services in {GST_HUB_CITY}</H2>
        <P>
          Filing360 serves businesses across India online and works directly with clients in {GST_HUB_CITY} and nearby areas such as {GST_HUB_AREAS[0]} and {GST_HUB_AREAS[1]}. Whether you need GST registration in {GST_HUB_CITY}, monthly GST return filing or help with a notice from your local GST office, you get the same CA-led service, with in-person meetings available on request.
        </P>
      </article>

      <section id="gst-packages" className="scroll-mt-28 mx-auto max-w-[1240px] space-y-9 px-5 pb-8 md:px-8 lg:space-y-12 lg:pb-16">
        <div>
          <H2 id="packages-heading">Our GST packages</H2>
          <P>Transparent professional fees. Government charges, where applicable, are always extra.</P>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d7e4de] bg-white">
            <table className="w-full min-w-[640px] text-left text-[14.5px]">
              <thead className="bg-[#eef4f1] text-[#0f2a45]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Package</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Includes</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d7e4de]">
                {packages.map((row) => (
                  <tr key={row.name}>
                    <td className="px-4 py-3 font-semibold text-[#0f2a45]">
                      <Link href={row.href} className="hover:text-[#0e7b5b]">
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[#2c3f4e]">{row.includes}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-[#0e7b5b]">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#2c3f4e]">
            Start your GST registration today. Talk to a Chartered Accountant free for 15 minutes.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <PrimaryButton href={GST.reg}>Get started</PrimaryButton>
            <SecondaryButton href={whatsappLink("Hi Filing360, I need help with GST.")}>WhatsApp us</SecondaryButton>
          </div>
        </div>

        {pillar.groups.map((group, gi) => (
          <section key={group.name ?? gi}>
            {group.name && (
              <h3 className="mb-4 text-[18px] font-bold tracking-tight text-[#0f2a45] md:mb-5 md:text-[20px]">
                {group.name}
                <span className="ml-2 align-middle text-[13.5px] font-semibold text-[#8a9ba6]">{group.services.length}</span>
              </h3>
            )}
            <ul className="rail rail-bleed grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] lg:grid-cols-3 xl:grid-cols-4">
              {group.services.map((service) => (
                <li key={service.slug}>
                  <ServiceCard pillar={pillar} service={service} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      <section id="gst-faqs" className="scroll-mt-28 border-t border-[#d7e4de] bg-[#eef4fb]">
        <div className="mx-auto max-w-[800px] px-5 py-10 md:px-8 md:py-14">
          <H2 id="gst-faqs-heading">Frequently Asked Questions on GST</H2>
          <div className="mt-6 divide-y divide-[#d7e4de] overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
            {gstFaqs.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 marker:hidden hover:bg-[#f3f7fa] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[16px] font-semibold text-[#0f2a45]">{item.q}</h3>
                  <span className="mt-0.5 shrink-0 text-[#0e7b5b] transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15.5px] leading-relaxed text-[#4a5d68]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Start your GST registration today"
        body="Talk to a Chartered Accountant free for 15 minutes. We'll tell you whether you need GST, which scheme fits, and the exact fee — before you pay anything."
      />
    </>
  );
}
