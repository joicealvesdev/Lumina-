import { FormEvent, useState } from "react";
import illustration from "../imagens/undraw_online-collaboration_xon8.jpg";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
};

type Gender = "" | "Feminino" | "Masculino" | "Outro" | "Prefiro não dizer";
type FormErrors = Partial<Record<keyof FormData, string>>;

const genderOptions: Gender[] = ["Feminino", "Masculino", "Outro", "Prefiro não dizer"];

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  function updateField(field: keyof FormData, value: string): void {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccessMessage("");
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Digite seu primeiro nome.";
    if (!form.lastName.trim()) nextErrors.lastName = "Digite seu sobrenome.";
    if (!form.email.trim()) nextErrors.email = "Digite seu e-mail.";
    else if (!form.email.includes("@")) nextErrors.email = "O e-mail precisa ter um @.";
    else if (!form.email.toLowerCase().includes(".com")) nextErrors.email = "O e-mail precisa ter .com.";
    if (!form.phone) nextErrors.phone = "Digite seu celular.";
    if (!form.password) nextErrors.password = "Digite sua senha.";
    if (!form.confirmPassword) nextErrors.confirmPassword = "Confirme sua senha.";
    else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "As senhas não coincidem.";
    }
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Cadastro realizado com sucesso. Seja bem-vinda!");
      setForm(initialForm);
    }, 600);
  }

  return (
    <main className={`page-shell${darkTheme ? " dark-theme" : ""}`}>
      <button
        className="theme-toggle"
        type="button"
        aria-label={darkTheme ? "Ativar tema claro" : "Ativar tema escuro"}
        title={darkTheme ? "Ativar tema claro" : "Ativar tema escuro"}
        onClick={() => setDarkTheme((current) => !current)}
      >
        {darkTheme ? "☀" : "☾"}
      </button>
      <section className="signup-card" aria-label="Cadastro na Lumina">
        <aside className="visual-panel">
          <div className="brand-mark" aria-label="Lumina">lumina<span>.</span></div>
          <div className="visual-copy">
            <p className="eyebrow">Um espaço para suas ideias</p>
            <p>Crie sua conta e organize o que importa em um só lugar.</p>
          </div>
          <img src={illustration} alt="Pessoas colaborando em um projeto" />
          <p className="visual-caption">Feito para criar, compartilhar e evoluir.</p>
        </aside>

        <section className="form-panel">
          <header className="form-header">
            <div>
              <p className="eyebrow">Primeiro passo</p>
              <h1>Crie sua conta</h1>
              <p>Preencha seus dados para começar sua jornada.</p>
            </div>
            <button className="login-button" type="button" onClick={() => setNotice("O acesso estará disponível em breve.")}>Entrar</button>
          </header>

          {notice && <p className="notice" role="status">{notice}</p>}
          {successMessage && <p className="success-message" role="status">{successMessage}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <Field label="Nome" name="firstName" value={form.firstName} placeholder="Joice" error={errors.firstName} onChange={updateField} />
              <Field label="Sobrenome" name="lastName" value={form.lastName} placeholder="Alves" error={errors.lastName} onChange={updateField} />
            </div>
            <div className="field-row">
              <Field label="E-mail" name="email" type="email" value={form.email} placeholder="voce@exemplo.com" error={errors.email} onChange={updateField} />
              <Field label="Celular" name="phone" type="tel" value={form.phone} placeholder="11987654321" error={errors.phone} required onChange={updateField} />
            </div>
            <div className="field-row">
              <PasswordField label="Senha" name="password" value={form.password} placeholder="Mínimo de 8 caracteres" error={errors.password} visible={showPasswords} onChange={updateField} onToggle={() => setShowPasswords((current) => !current)} />
              <PasswordField label="Confirme sua senha" name="confirmPassword" value={form.confirmPassword} placeholder="Repita sua senha" error={errors.confirmPassword} visible={showPasswords} onChange={updateField} onToggle={() => setShowPasswords((current) => !current)} />
            </div>

            <fieldset className="gender-field">
              <legend>Gênero <span>(opcional)</span></legend>
              <div className="radio-options">
                {genderOptions.map((option) => (
                  <label key={option} className="radio-option">
                    <input type="radio" name="gender" value={option} checked={form.gender === option} onChange={() => updateField("gender", option)} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando sua conta..." : "Continuar"}
              {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
            <p className="terms">Ao continuar, você concorda com nossos <a href="#termos">termos de uso</a>.</p>
          </form>
        </section>
      </section>
    </main>
  );
}

type FieldProps = {
  label: string;
  name: keyof FormData;
  type?: string;
  value: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  onChange: (field: keyof FormData, value: string) => void;
};

function Field({ label, name, type = "text", value, placeholder, error, required, onChange }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div className="field">
      <label htmlFor={name}>{label}{required && <span className="required-mark"> *</span>}</label>
      <input id={name} name={name} type={type} inputMode={name === "phone" ? "numeric" : undefined} value={value} placeholder={placeholder} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} onChange={(event) => onChange(name, name === "phone" ? event.target.value.replace(/\D/g, "") : event.target.value)} />
      {error && <span className="field-error" id={errorId} role="alert">{error}</span>}
    </div>
  );
}

function PasswordField({ label, name, value, placeholder, error, visible, onChange, onToggle }: FieldProps & { visible: boolean; onToggle: () => void }) {
  const errorId = `${name}-error`;
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className="password-input">
        <input id={name} name={name} type={visible ? "text" : "password"} value={value} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} onChange={(event) => onChange(name, event.target.value)} />
        <button className="password-toggle" type="button" aria-label={visible ? "Ocultar senha" : "Mostrar senha"} onClick={onToggle}>{visible ? "Ocultar" : "Mostrar"}</button>
      </div>
      {error && <span className="field-error" id={errorId} role="alert">{error}</span>}
    </div>
  );
}

export default App;