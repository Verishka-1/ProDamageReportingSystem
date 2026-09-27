import LoginForm from "@/components/LoginForm";
import { app } from "@/services/firebase";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Text } from "react-native";

export default function SignupScreen() {
  const router = useRouter();

  const handleSignup = async (email: string, password: string) => {
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password);
    router.replace("/");
  };

  return (
    <LoginForm
      onLogin={handleSignup}
      title="Create Account"
      subtitle="Sign up to get started"
      buttonLabel="Sign Up"
      errorTitle="Sign up failed"
      footer={
        <Link href="/login" style={{ color: "#2563EB", fontSize: 14 }}>
          <Text>Already have an account? Log in</Text>
        </Link>
      }
    />
  );
}
