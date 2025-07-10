import Achievement from "../User/achievement";
import UserTitle from "../User/UserTitle";


export default function UserPage() {
 

  return (
    <div className="w-full min-h-screen py-20">
    <UserTitle />
      <section className="w-full  flex flex-col justify-center items-center">
        <Achievement/>
      </section>
    </div>
  );
}
