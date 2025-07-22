import AvatarSelect from "./AvatarSelect";
import FormModify from "./FormModify";

export default function AccountSet() {
  return (
    <section className="">


      <FormModify onRegisterError={() => { }} onRegisterSuccess={() => { }} />
      <h2 className="text-lg font-semibold pb-4 pt-10">編輯頭像</h2>
      <AvatarSelect onSelect={() => { }} selectedAvatar={null} />
    </section>
  );
}
