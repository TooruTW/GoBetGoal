import GradientText from "@/components/shared/reactBit/GradientText";
import SplitText from "@/components/shared/reactBit/SplitText";

export default function Home() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <section className="w-full h-screen flex-col justify-center items-center">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={1}
        showBorder={false}
        className="custom-class text-9xl  font-title"
      >
        Flag or bet
      </GradientText>

      <SplitText
        text="在樂園裡，你要做的只有減肥、減肥、還有（腰獸粗話）的減肥"
        className="text-2xl font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    </section>
  );
}
