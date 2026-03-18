export type ReportStatus = "Open" | "Reviewed" | "Resolved";

export interface Report {
  id: number;
  title: string;
  property: string;
  description?: string[];
  date: string;
  status: ReportStatus;
}

export const reports: Report[] = [
  {
    id: 1,
    title: "Misleading Information",
    property: "3 Bedroom Flat - Lekki",
    description:
      "Tenant claims the property does not have the amenities listed in the description. Specifically, there is no swimming pool and the generator is not functional.",
    date: "Jan 12, 2026",
    status: "Open",
  },
  {
    id: 2,
    title: "Unresponsive Agent",
    property: "2 Bedroom Apartment - VI",
    description:
      "The Tenant claims that the agent has been unresponsive despite several attempts to establish communication regarding the ongoing matter. Multiple messages and follow-ups have been sent through the available communication channels, but no response has been received. This lack of communication has made it difficult to proceed with resolving the issue.",
    date: "Jan 10, 2026",
    status: "Reviewed",
  },
  {
    id: 3,
    title: "Property Condition",
    property: "Studio Apartment - Yaba",
    description:
      [
        "I would like to file a complaint regarding the property that was presented during the viewing process. During the initial viewing, the unit shown to me appeared to be well-maintained and included several features and amenities that influenced my decision to proceed with the rental.",
      
       "However, after moving forward with the agreement and gaining access to the actual unit assigned to me, I discovered that it was significantly different from the one that was shown during the viewing. The condition, layout, and overall quality of the unit do not match what was previously presented.",
       
      " Certain features that were visible during the viewing were either missing or in poorer condition in the actual unit provided. This discrepancy feels misleading, as the decision to rent the property was based on the expectations created during the viewing. I believe that prospective tenants should be shown the exact unit they will be renting, or at the very least be clearly informed if the unit being shown is only a sample.",
       
       "I kindly request that this matter be reviewed and addressed promptly. I would appreciate either a suitable resolution, such as being provided with a unit that matches what was originally shown, or another fair solution to resolve this issue."],
    date: "Jan 8, 2026",
    status: "Resolved",
  },
];