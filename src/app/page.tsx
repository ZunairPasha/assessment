import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(() => import("./home"), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <>
      <DynamicComponentWithNoSSR />
    </>
  );
};

export default Home;
