import Link from "next/link";
import type { HubPackageRow } from "@/content/seoTypes";

export function HubPackagesTable({
  id = "packages",
  title = "Our packages",
  intro = "Transparent professional fees. Government charges, where applicable, are always extra.",
  packages,
}: {
  id?: string;
  title?: string;
  intro?: string;
  packages: HubPackageRow[];
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <h2 className="scroll-mt-28 text-[22px] font-bold tracking-tight text-[#0f2a45] md:text-[28px]">
        {title}
      </h2>
      <p className="mt-3 text-[15.5px] leading-[1.7] text-[#2c3f4e]">{intro}</p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d7e4de] bg-white">
        <table className="w-full min-w-[640px] text-left text-[14.5px]">
          <thead className="bg-[#eef4f1] text-[#0f2a45]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Package
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Includes
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Price
              </th>
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
    </div>
  );
}
