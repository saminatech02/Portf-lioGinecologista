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

type FormType = {

  cpf: string;
  code: string;

  name: string;
  born: string;
  gender: string;

  contact_cellphone: string;
  email: string;

  cpf_responsible: string;

  insurance_number: string;
  insurance_id: string;

  address_cep: string;
  address_address: string;
  address_number: string;
  address_district: string;
  address_city: string;
  address_state: string;
  address_country: string;

  categoria: string;

  data: string;
  horario: string;

  user_id: string;
  timegrid_id: string;
  slot_id: string;

  patient_id?: string;

  event_id: number | null;

  event: any;
};

const initialForm: FormType = {

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
  horario: "",

  user_id: "",
  timegrid_id: "",
  slot_id: "",

  patient_id: "",

  event_id: null,
  event: null
};

export default function Agendamento() {

  const [step, setStep] =
    useState<Step>("patientType");

  const [registerStep, setRegisterStep] =
    useState(1);

  const [patientExists, setPatientExists] =
    useState(false);

  const [form, setForm] =
    useState<FormType>(initialForm);

  // =========================
  // UPDATE FIELD
  // =========================

  const updateField = (
    field: keyof FormType,
    value: any
  ) => {

    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // =========================
  // UPDATE MULTIPLE
  // =========================

  const updateForm = (
    values: Partial<FormType>
  ) => {

    setForm((prev) => ({
      ...prev,
      ...values
    }));
  };

  // =========================
  // FLUXO CPF
  // =========================

  const handleCpfCheck = (
    pacienteExiste: boolean
  ) => {

    setPatientExists(
      pacienteExiste
    );

    if (pacienteExiste) {

      setStep("otp");

    } else {

      setStep("register");
    }
  };

  // =========================
  // RESET FORM
  // =========================

  const resetFlow = () => {

    setStep("patientType");

    setRegisterStep(1);

    setPatientExists(false);

    setForm(initialForm);
  };

  // =========================
  // VOLTAR
  // =========================

  const handleBack = () => {

    switch (step) {

      case "cpf":
        resetFlow()
        break;

      case "register":

        if (registerStep === 2) {

          setRegisterStep(1);

        } else {

          resetFlow();
        }

        break;

      case "otp":

        if (patientExists) {

          setStep("cpf");

        } else {

          setStep("register");

          setRegisterStep(2);
        }

        break;

      case "category":
        setStep("otp");
        break;

      case "date":
        setStep("category");
        break;

      case "schedule":
        setStep("date");
        break;

      case "success":
        setStep("patientType");
        break;
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

            onNext={handleCpfCheck}
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

            patientBool={
              patientExists
            }

            updateField={
              updateField
            }

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
            form={form}
            onSelect={(event) => {

              updateForm({

                event_id:
                  event.id,

                event
              });

              setStep("date");
            }}
          />
        )}

        {/* =========================
            DATA/HORÁRIO
        ========================= */}

        {step === "date" && (

          <StepCategory

            form={form}

            onSelect={(slot: any) => {

              updateForm({

                data:
                  slot.date,

                horario:
                  slot.start,

                user_id:
                  String(
                    slot.user_id
                  ),

                timegrid_id:
                  String(
                    slot.timegrid_id
                  ),

                slot_id:
                  slot.slot_id
              });

              setStep("schedule");
            }}
          />
        )}

        {/* =========================
            CONFIRMAÇÃO
        ========================= */}

        {step === "schedule" && (

          <StepSchedule

            form={form}

            onSuccess={() =>
              setStep("success")
            }
          />
        )}

        {/* =========================
            SUCESSO
        ========================= */}

        {step === "success" && (

          <StepSuccess

            horario={form.horario}

            data={form.data}

            categoria={
              form.event?.preview_name ||
              form.event?.name
            }

            onFinish={
              resetFlow
            }
          />
        )}

      </div>

    </section>
  );
}