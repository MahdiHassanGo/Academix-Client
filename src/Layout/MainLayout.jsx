import { useEffect } from "react";

import MainPage from "../components/MainPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomerReview from "../components/CustomerReview";
import MainSlider from "../components/Comapnies";
import Companies from "../components/Comapnies";
import ClassesSection from "../components/ClassesSection";
import BecomeTeacher from "../components/BecomeTeacher";
import MoreInfo from "../components/MoreInfo";
import AboutUs from "../components/AboutUs";
import Total from "../components/Total";
import NewsLetter from "../components/NewsLetter";

const MainLayout = () => {
  fetch("https://b10a12-server-side-mahdi-hassan-go.vercel.app/feedback")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));

  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = "Home | Academix";
  }, []);
  return (
    <div className="">
      <div className=" mx-auto   ml-5 md:ml-20">
        <Navbar></Navbar>
      </div>

      <div className="mx-auto overflow-x-hidden">
        <MainPage></MainPage>
        <Companies></Companies>
        <ClassesSection></ClassesSection>
        <Total></Total>
        <BecomeTeacher></BecomeTeacher>
        <CustomerReview></CustomerReview>
        <MoreInfo></MoreInfo>
        <AboutUs></AboutUs>
        <NewsLetter></NewsLetter>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
