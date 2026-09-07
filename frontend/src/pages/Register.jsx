import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp, getOrganizations, storeToken } from "../api";
import { setUser } from "../slice/Auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useModal } from "../ModalContext";
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { closeModal, openModal } = useModal();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    organization_id: "",
  organization_name: "",
  });
  const [organizationType, setOrganizationType] = useState("existing");
  const [organizations, setOrganizations] = useState([]);

  const redirectToOrganization = (organization) => {
    if (!organization?.subdomain) {
      return false;
    }

    const currentHost = window.location.hostname;
    const currentPort = window.location.port ? `:${window.location.port}` : "";
    const targetHost = currentHost === organization.subdomain || currentHost === `${organization.subdomain}.localhost`
      ? currentHost
      : `${organization.subdomain}.localhost`;

    const targetUrl = `${window.location.protocol}//${targetHost}${currentPort}/blogs`;

    if (window.location.href.startsWith(targetUrl)) {
      return true;
    }

    window.location.href = targetUrl;
    return true;
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getOrganizations();
        const payload = response?.data;
        const orgList = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.organizations)
            ? payload.organizations
            : Array.isArray(payload?.data)
              ? payload.data
              : [];

        setOrganizations(orgList);

        if (orgList.length === 0 && organizationType === "existing") {
          setOrganizationType("new");
        }
      } catch (error) {
        setOrganizations([]);
        setOrganizationType("new");
        toast.error("Failed to load organizations. You can create a new one instead.");
      }
    };

    fetchOrganizations();
  }, []);
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOrganizationTypeChange = (e) => { setOrganizationType(e.target.value); 
    setForm((prev) => ({ ...prev, organization_id: "", organization_name: "", })); };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username: form.username, email: form.email, password: form.password, password_confirmation: form.password_confirmation, };
    if (organizationType === "existing")
         { data.organization_id = form.organization_id; } 
    else 
        { data.organization = { name: form.organization_name, }; }
    try {
      const response = await signUp(data);

      const token = response.data.token || (response.headers?.authorization ? response.headers.authorization.replace("Bearer ", "") : null);
      if (token) {
        storeToken(token);
      }

      dispatch(setUser(response.data.user));
      toast.success(response.data.message);
      closeModal();

      const redirected = redirectToOrganization(response.data.organization);
      if (!redirected) {
        navigate("/blogs");
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      toast.error(Array.isArray(errors) ? errors.join(", ") : t("auth.registrationFailed"));
    }
  };

  return (
    <div>
      <h1>{t("common.register")}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("auth.username")}</label>
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>

        <div>
          <label>{t("auth.email")}</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div>
          <label>{t("auth.password")}</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>

        <div>
          <label>{t("auth.confirmPassword")}</label>
          <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} required />
        </div>
       <div> 
        <label>Organization</label> 
        <select value={organizationType} onChange={handleOrganizationTypeChange} > 
            <option value="existing">Join existing company</option> 
            <option value="new">Create new company</option> </select>
         </div> 
         {organizationType === "existing" && ( <div> <label>Choose company</label> <select name="organization_id" value={form.organization_id} onChange={handleChange} required > 
            <option value="">Select a company</option> 
            {organizations.map((organization) => ( <option key={organization.id} value={organization.id}> {organization.name} </option> ))} 
            </select>
             </div> )} 
            {organizationType === "new" && ( <div> <label>Company name</label> 
            <input name="organization_name" value={form.organization_name} onChange={handleChange} placeholder="Enter company name" required /> 
            </div> )}
        <button type="submit">{t("common.register")}</button>
      </form>

      <p>
        {t("auth.alreadyAccount")}
        <button className="link-btn" onClick={() => openModal("login")}>
          {t("common.login")}
        </button>
      </p>
    </div>
  );
}


