import LoginForm from "@/components/LoginForm";
import { app } from "@/services/firebase";
import { Link, useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Text } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
    router.replace("/");
  };

  return (
    <LoginForm
      onLogin={handleLogin}
      footer={
        <Link href="/signup" style={{ color: "#2563EB", fontSize: 14 }}>
          <Text>Don't have an account? Sign up</Text>
        </Link>
      }
    />
  );
}
