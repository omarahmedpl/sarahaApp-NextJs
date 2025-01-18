"use client";
import { useCallback, useEffect, useState } from "react";
import Loading from "../ui/Loading";
import {
  deactivateAccount,
  fetchProfile,
  updateEmail,
  updatePassword,
  updateUserInformation,
} from "../actions/user";
import Error from "../ui/Error";
import Modal from "../ui/Modal";
import ProfileCard from "../profile/ProfileCard";
import EditProfileSection from "../ui/EditProfileSection";
import { FaLock, FaMailBulk, FaUser } from "react-icons/fa";
import { useAuthStore } from "../zustand/store";
import {
  updateEmailSchema,
  updateInformationSchema,
  updatePasswordSchema,
} from "../actions/schema";
import CustomInput from "../ui/CustomInput";
import CustomTextArea from "../ui/CustomTextArea";
import CustomSelect from "../ui/CustomSelect";
import { CreateFormikConfig } from "../utils/formik";

const Manage = () => {
  const { logout } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [userUpdateSuccessfully, setUserUpdateSuccessfully] = useState(false);
  const [user, setUser] = useState(null);
  const [messagesLength, setMessagesLength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("Deactivate Account");

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await fetchProfile();
      setUser(userData.user);
      setMessagesLength(userData?.messages?.length || 0);
      console.log(userData.user.dob);

      updateInformationForm.setFieldValue("username", userData.user.username);
      updateInformationForm.setFieldValue("bio", userData.user.bio || "");
      updateInformationForm.setFieldValue("gender", userData.user.gender);
      updateInformationForm.setFieldValue(
        "dob",
        userData.user.dob
          ? new Date(userData.user.dob).toISOString().split("T")[0]
          : ""
      );
      updateInformationForm.setFieldValue("image", userData.user.image || "");
    } catch (err) {
      console.error("Failed to load user profile:", err);
      setError("Failed to load user profile.");
    } finally {
      setLoading(false);
    }
  }, [userUpdateSuccessfully]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleDeactivateAccount = async () => {
    setLoadingProcess(true);
    try {
      await deactivateAccount({ email: user?.email, setLoadingProcess });
      logout();
    } finally {
      setLoadingProcess(false);
    }
  };

  const updatePasswordForm = CreateFormikConfig(
    {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    updatePasswordSchema,
    async (values) => {
      setLoadingProcess(true);
      try {
        await updatePassword({ ...values, setLoadingProcess });
        logout();
      } finally {
        setLoadingProcess(false);
      }
    }
  );

  const updateEmailForm = CreateFormikConfig(
    { email: "" },
    updateEmailSchema,
    async (values) => {
      setLoadingProcess(true);
      try {
        await updateEmail({ email: values.email, setLoadingProcess });
        logout();
      } finally {
        setLoadingProcess(false);
      }
    }
  );

  const updateInformationForm = CreateFormikConfig(
    {
      username: user?.username || "",
      bio: user?.bio || "",
      gender: user?.gender || "male",
      dob: user?.dob || "",
      image: user?.image || "",
    },
    updateInformationSchema,
    async (values) => {
      setUserUpdateSuccessfully(false);
      setLoadingProcess(true);
      updateUserInformation({ ...values, setLoadingProcess });
      await fetchUser();
      setLoadingProcess(false);
      setUserUpdateSuccessfully(true);
    }
  );
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="container flex flex-col md:flex-row gap-[30px]">
      {/* Profile Section */}
      <div className="flex-[0.4] h-fit border rounded-md overflow-hidden flex flex-col items-center">
        {user ? (
          <ProfileCard
            userData={user}
            messages={messagesLength}
            className="flex flex-col items-center w-full"
          />
        ) : (
          <div>Error loading profile.</div>
        )}
      </div>

      {/* Messages Section */}
      <div className="flex-[0.6] gap-5 border rounded-md min-h-[400px] overflow-hidden p-10 flex flex-col items-center">
        <EditProfileSection
          icon={<FaUser size={24} />}
          label="Deactivate Account"
        >
          <div className="text-red-500">
            You can activate your account anytime by logging in.
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
              setModelTitle("Deactivate Account");
            }}
            className="btn-danger mt-4"
          >
            Deactivate Account
          </button>
        </EditProfileSection>

        <EditProfileSection icon={<FaLock size={24} />} label="Update Password">
          <form
            onSubmit={updatePasswordForm.handleSubmit}
            className="flex flex-col gap-4"
          >
            <CustomInput
              input={{
                id: "currentPassword",
                type: "password",
                name: "currentPassword",
                label: "Current Password",
              }}
              error={
                updatePasswordForm.touched.currentPassword &&
                updatePasswordForm.errors.currentPassword
                  ? (updatePasswordForm.errors.currentPassword as string)
                  : ""
              }
              value={updatePasswordForm.values.currentPassword}
              onChange={updatePasswordForm.handleChange}
              onBlur={updatePasswordForm.handleBlur}
            />
            <CustomInput
              input={{
                id: "password",
                type: "password",
                name: "password",
                label: "New Password",
              }}
              error={
                updatePasswordForm.touched.password &&
                (updatePasswordForm.errors.password as string)
              }
              value={updatePasswordForm.values.password}
              onChange={updatePasswordForm.handleChange}
              onBlur={updatePasswordForm.handleBlur}
            />
            <CustomInput
              input={{
                id: "confirmPassword",
                type: "password",
                name: "confirmPassword",
                label: "Confirm Password",
              }}
              error={
                updatePasswordForm.touched.confirmPassword &&
                (updatePasswordForm.errors.confirmPassword as string)
              }
              value={updatePasswordForm.values.confirmPassword}
              onChange={updatePasswordForm.handleChange}
              onBlur={updatePasswordForm.handleBlur}
            />
            <button
              type="submit"
              disabled={loadingProcess || !updatePasswordForm.isValid}
              className="btn-primary w-fit lg:ms-[230px]"
            >
              {loadingProcess ? "Updating..." : "Update Password"}
            </button>
          </form>
        </EditProfileSection>

        <EditProfileSection
          icon={<FaMailBulk size={24} />}
          label="Update Email"
        >
          <form
            onSubmit={updateEmailForm.handleSubmit}
            className="flex flex-col gap-4"
          >
            <CustomInput
              input={{
                id: "email",
                type: "email",
                name: "email",
                label: "New Email",
              }}
              error={
                updateEmailForm.touched.email && updateEmailForm.errors.email
                  ? (updateEmailForm.errors.email as string)
                  : ""
              }
              value={updateEmailForm.values.email}
              onChange={updateEmailForm.handleChange}
              onBlur={updateEmailForm.handleBlur}
            />
            <button
              type="submit"
              disabled={loadingProcess || !updateEmailForm.isValid}
              className="btn-primary w-fit lg:ms-[230px]"
            >
              {loadingProcess ? "Updating..." : "Update Email"}
            </button>
          </form>
        </EditProfileSection>

        <EditProfileSection
          icon={<FaUser size={24} />}
          label="Edit Personal Information"
        >
          <form
            onSubmit={updateInformationForm.handleSubmit}
            className="flex flex-col gap-4"
          >
            <CustomInput
              input={{
                id: "username",
                type: "text",
                name: "username",
                label: "Username",
              }}
              error={
                updateInformationForm.touched.username &&
                updateInformationForm.errors.username
                  ? (updateInformationForm.errors.username as string)
                  : ""
              }
              value={updateInformationForm.values.username}
              onChange={updateInformationForm.handleChange}
              onBlur={updateInformationForm.handleBlur}
            />
            <CustomInput
              input={{
                id: "image",
                type: "text",
                name: "image",
                label: "Image",
              }}
              error={
                updateInformationForm.touched.image &&
                updateInformationForm.errors.image
                  ? (updateInformationForm.errors.image as string)
                  : ""
              }
              value={updateInformationForm.values.image}
              onChange={updateInformationForm.handleChange}
              onBlur={updateInformationForm.handleBlur}
            />
            <CustomTextArea
              input={{
                id: "bio",
                name: "bio",
                label: "Bio",
              }}
              autoFocus={false}
              error={
                updateInformationForm.touched.bio &&
                updateInformationForm.errors.bio
                  ? (updateInformationForm.errors.bio as string)
                  : ""
              }
              value={updateInformationForm.values.bio}
              onChange={updateInformationForm.handleChange}
              onBlur={updateInformationForm.handleBlur}
            />
            <CustomSelect
              input={{
                id: "gender",
                name: "gender",
                label: "Gender",
              }}
              options={[
                {
                  label: "Male",
                  value: "male",
                },
                {
                  label: "Female",
                  value: "female",
                },
              ]}
              error={
                updateInformationForm.touched.gender &&
                updateInformationForm.errors.gender as string
              }
              value={updateInformationForm.values.gender}
              onChange={updateInformationForm.handleChange}
              onBlur={updateInformationForm.handleBlur}
            />
            <CustomInput
              input={{
                id: "dob",
                type: "date",
                name: "dob",
                label: "Birth Date",
              }}
              error={
                updateInformationForm.touched.dob &&
                updateInformationForm.errors.dob as string
              }
              value={updateInformationForm.values.dob}
              onChange={updateInformationForm.handleChange}
              onBlur={updateInformationForm.handleBlur}
            />
            <button
              type="submit"
              disabled={loadingProcess || !updateInformationForm.isValid}
              className="btn-primary w-fit lg:ms-[230px]"
            >
              {loadingProcess ? "Updating..." : "Update Information"}
            </button>
          </form>
        </EditProfileSection>
      </div>

      <Modal modalProps={{ isOpen, setIsOpen, title: modelTitle }}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-center">
            <button
              disabled={loadingProcess}
              onClick={handleDeactivateAccount}
              className="btn-danger"
            >
              {loadingProcess ? "Deactivating..." : "Deactivate"}
            </button>
            <button onClick={() => setIsOpen(false)} className="btn-info">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Manage;
