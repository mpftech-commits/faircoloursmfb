import PageContainer from "../agentdashboardlayout/PageContainer";
import AvatarUpload from "../components/settingscomponent/AvatarUpload";
import FormInput from "../components/settingscomponent/FormInput";
import SaveButton from "../components/settingscomponent/SaveButton";

export default function PersonalInformation() {
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <PageContainer
      title="Personal Information"
      subtitle="Update your personal details"
    >

      <AvatarUpload />

      <div className="space-y-4">

        <FormInput
          label="Full Name"
          placeholder="John Doe"
          value={savedUser.fullName}
          required
        />

        <FormInput
          label="Phone Number"
          placeholder="08103495377"
          // value={savedUser.phone}
          required
        />

        <FormInput
          label="Email address (Optional)"
          placeholder="johndoe@gmail.com"
          value={savedUser.email}
        />

      </div>

      <SaveButton />

    </PageContainer>
  );
}