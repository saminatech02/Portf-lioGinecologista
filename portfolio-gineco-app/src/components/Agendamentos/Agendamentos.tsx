import { useState } from "react";

import StepPatientType from "./steps/StepPatientType";
import StepCpf from "./steps/StepCpf";
import StepRegisterPersonal from "./steps/StepRegisterPersonal";
import StepRegisterAddress from "./steps/StepRegisterAddress";
import StepOtp from "./steps/StepOtp";
import StepType from "./steps/StepType";
import StepCategory from "./steps/StepCategory";
import StepSchedule from "./steps/StepSchedule";
import StepSuccess from "./steps/StepSuccess";

import styles from "./Agendamento.module.css";

export type Step =
  | "patientType"
  | "cpf"
  | "register"
  | "otp"
  | "category"
  | "date"
  | "schedule"
  | "success";

export default function Agendamento() {

  const [step, setStep] =
    useState<Step>("patientType");

  const [registerStep, setRegisterStep] =
    useState(1);

  const [form, setForm] = useState({

    cpf: "",
    code: "",

    name: "",
    born: "",
    gender: "",

    contact_cellphone: "",
    email: "",

    cpf_responsible: "",

    insurance_number: "",
    insurance_id: "",

    address_cep: "",
    address_address: "",
    address_number: "",
    address_district: "",
    address_city: "",
    address_state: "",
    address_country: "Brasil",

    categoria: "",

    data: "",
    horario: ""
  });

  const updateField = (
    field: string,
    value: string
  ) => {

    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // =========================
  // FLUXO CPF
  // =========================

  const handleCpfCheck = (
    pacienteExiste: boolean
  ) => {

    if (pacienteExiste) {

      setStep("otp");

    } else {

      setStep("register");
    }
  };

  // =========================
  // VOLTAR
  // =========================

  const handleBack = () => {

    if (step === "cpf") {

      setStep("patientType");
    }

    else if (
      step === "register" &&
      registerStep === 2
    ) {

      setRegisterStep(1);
    }

    else if (
      step === "register" &&
      registerStep === 1
    ) {

      setStep("patientType");
    }

    else if (step === "otp") {

      if (form.name) {

        setStep("register");

      } else {

        setStep("cpf");
      }
    }

    else if (step === "category") {

      setStep("otp");
    }

    else if (step === "date") {

      setStep("category");
    }

    else if (step === "schedule") {

      setStep("date");
    }

    else if (step === "success") {

      setStep("schedule");
    }
  };

  return (

    <section className={styles.wrapper}>

      {/* =========================
          PROGRESS BAR
      ========================= */}

      <div className={styles.progress}>
        <div
          className={`
            ${styles.bar}
            ${styles[step]}
          `}
        />
      </div>

      {/* =========================
          HEADER
      ========================= */}

      <div className={styles.header}>

        {step !== "patientType" && (

          <button
            className={styles.backButton}
            onClick={handleBack}
          >
            ←
          </button>
        )}

        <h1>
          Agendar consulta
        </h1>

      </div>

      {/* =========================
          CARD
      ========================= */}

      <div className={styles.card}>

        {/* =========================
            PACIENTE
        ========================= */}

        {step === "patientType" && (

          <StepPatientType

            onExistingPatient={() =>
              setStep("cpf")
            }

            onNewPatient={() =>
              setStep("register")
            }
          />
        )}

        {/* =========================
            CPF
        ========================= */}

        {step === "cpf" && (

          <StepCpf

            form={form}

            updateField={updateField}

            onNext={(
              pacienteExiste: boolean
            ) =>
              handleCpfCheck(
                pacienteExiste
              )
            }
          />
        )}

        {/* =========================
            CADASTRO - DADOS
        ========================= */}

        {step === "register" &&
          registerStep === 1 && (

            <StepRegisterPersonal

              form={form}

              updateField={updateField}

              onNext={() =>
                setRegisterStep(2)
              }
            />
          )}

        {/* =========================
            CADASTRO - ENDEREÇO
        ========================= */}

        {step === "register" &&
          registerStep === 2 && (

            <StepRegisterAddress

              form={form}

              updateField={updateField}

              onBack={() =>
                setRegisterStep(1)
              }

              onSubmit={() =>
                setStep("otp")
              }
            />
          )}

        {/* =========================
            OTP
        ========================= */}

        {step === "otp" && (

          <StepOtp

            form={form}

            updateField={updateField}

            onNext={() =>
              setStep("category")
            }
          />
        )}

        {/* =========================
            TIPO CONSULTA
        ========================= */}

        {step === "category" && (

          <StepType

            onSelect={(tipo: string) => {

              updateField(
                "categoria",
                tipo
              );

              setStep("date");
            }}
          />
        )}

        {/* =========================
            DATA
        ========================= */}

        {step === "date" && (

          <StepCategory

            selectedDate={form.data}

            onSelect={(data: string) => {

              updateField(
                "data",
                data
              );

              setStep("schedule");
            }}
          />
        )}

        {/* =========================
            HORÁRIO
        ========================= */}

        {step === "schedule" && (

          <StepSchedule

            selectedDate={form.data}

            onSelect={(horario: string) => {

              updateField(
                "horario",
                horario
              );

              setStep("success");
            }}
          />
        )}

        {/* =========================
            SUCESSO
        ========================= */}

        {step === "success" && (

          <StepSuccess

            horario={form.horario}

            data={form.data}

            categoria={form.categoria}

            onFinish={() => {

              setStep("patientType");

              setRegisterStep(1);

              setForm({

                cpf: "",
                code: "",

                name: "",
                born: "",
                gender: "",

                contact_cellphone: "",
                email: "",

                cpf_responsible: "",

                insurance_number: "",
                insurance_id: "",

                address_cep: "",
                address_address: "",
                address_number: "",
                address_district: "",
                address_city: "",
                address_state: "",
                address_country: "Brasil",

                categoria: "",

                data: "",
                horario: ""
              });
            }}
          />
        )}

      </div>

    </section>
  );
}