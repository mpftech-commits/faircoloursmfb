import PageContainer from "../agentdashboardlayout/PageContainer";
import FormInput from "../components/settingscomponent/FormInput";
import SaveButton from "../components/settingscomponent/SaveButton";
import { Lightbulb} from "lucide-react";

export default function BusinessInformation() {
  return (
    <PageContainer
      title="Business Information"
      subtitle="Manage your business details"
    >

      <div className="space-y-4">

        <FormInput
          label="Business Name"
          placeholder="Prime Properties Nigeria"
          required
        />

        <FormInput
          label="Primary Area of Operation"
          placeholder="Felele, Ibadan"
          required
        />

        <FormInput
          label="RC Number (Optional)"
          placeholder="RC1234567"
        />

      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg p-3 flex gap-5 items-center ">
        <Lightbulb /> Please Note: Business information helps build trust with potential tenants.
      </div>

      <SaveButton />

    </PageContainer>
  );
}