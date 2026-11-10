/**
 * Registers pillar → SEO service-page lookups.
 * Import this module for side effects from service/pillar routes.
 */
import { getAccountingServicePage } from "./accountingServicePages";
import { getFundsServicePage } from "./fundsServicePages";
import { getGstServicePage } from "./gstServicePages";
import { getIncomeTaxServicePage } from "./incomeTaxServicePages";
import { getMcaServicePage } from "./mcaServicePages";
import { getOtherServicesServicePage } from "./otherServicesServicePages";
import { getStartupServicePage } from "./startupServicePages";
import { registerSeoLookup } from "./seoRegistry";

registerSeoLookup("gst", getGstServicePage);
registerSeoLookup("income-tax", getIncomeTaxServicePage);
registerSeoLookup("mca", getMcaServicePage);
registerSeoLookup("accounting", getAccountingServicePage);
registerSeoLookup("funds", getFundsServicePage);
registerSeoLookup("startup", getStartupServicePage);
registerSeoLookup("other-services", getOtherServicesServicePage);
