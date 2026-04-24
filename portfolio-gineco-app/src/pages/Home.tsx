import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import About from "../components/About/About";
import Testimonials from "../components/Testimonials/Testimonials";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";
import Agendamentos from "../components/Agendamentos/Agendamentos";
import Convenios from "../components/Convênios/Convenios";

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <section id="inicio">
        <Hero />
      </section>

      <section id="sobre">
        <About />
      </section>

      <section id="servicos">
        <Services />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="convenios">
        <Convenios />
      </section>

      <section id="agendamentos">
        <Agendamentos />
      </section>

      <section id="contato">
        <CTA />
        <Footer />
      </section>
    </>
  );
};

export default Home;