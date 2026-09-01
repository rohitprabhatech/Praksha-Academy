import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const getStorageKey = (role) => `praksha_${role}_auth`;

const MOCK_USERS = [
  {
    email: "student@gmail.com",
    password: "student@123",
    role: "student",
    name: "Student User",
  },
  {
    email: "teacher@praksha.com",
    password: "teacher123",
    role: "teacher",
    name: "Teacher User",
  },
  {
    email: "admin@gmail.com",
    password: "admin@123",
    role: "admin",
    name: "Admin",
  },
];

const getStoredRoleAuth = (role) => {
  try {
    const key = getStorageKey(role);
    const rememberedUser = localStorage.getItem(key);

    if (rememberedUser) {
      const parsed = JSON.parse(rememberedUser);
      if (parsed?.role === role) return parsed;
    }

    const sessionUser = sessionStorage.getItem(key);

    if (sessionUser) {
      const parsed = JSON.parse(sessionUser);
      if (parsed?.role === role) return parsed;
    }

    // Fallback: Check legacy storage key if it matches role
    const legacyRemembered = localStorage.getItem("praksha_auth");
    if (legacyRemembered) {
      const parsed = JSON.parse(legacyRemembered);
      if (parsed?.role === role) return parsed;
    }

    const legacySession = sessionStorage.getItem("praksha_auth");
    if (legacySession) {
      const parsed = JSON.parse(legacySession);
      if (parsed?.role === role) return parsed;
    }

    return null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [sessions, setSessions] = useState(() => ({
    admin: getStoredRoleAuth("admin"),
    student: getStoredRoleAuth("student"),
    teacher: getStoredRoleAuth("teacher"),
  }));

  const login = async ({
    email,
    password,
    rememberMe = false,
    allowedRole = null,
  }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = MOCK_USERS.find(
      (mockUser) =>
        mockUser.email === normalizedEmail &&
        mockUser.password === password
    );

    // Invalid email/password
    if (!matchedUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Role restriction
    // Example:
    // normal login -> student only
    // admin login  -> admin only
    if (allowedRole && matchedUser.role !== allowedRole) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const userRole = matchedUser.role;
    const authenticatedUser = {
      name: matchedUser.name,
      email: matchedUser.email,
      role: userRole,
    };

    setSessions((prev) => ({
      ...prev,
      [userRole]: authenticatedUser,
    }));

    const key = getStorageKey(userRole);
    const serializedUser = JSON.stringify(authenticatedUser);

    if (rememberMe) {
      localStorage.setItem(key, serializedUser);
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, serializedUser);
      localStorage.removeItem(key);
    }

    // Clean up legacy storage key
    localStorage.removeItem("praksha_auth");
    sessionStorage.removeItem("praksha_auth");

    return {
      success: true,
      user: authenticatedUser,
    };
  };

  const logout = (targetRole = null) => {
    if (targetRole && (targetRole === "admin" || targetRole === "student" || targetRole === "teacher")) {
      setSessions((prev) => ({
        ...prev,
        [targetRole]: null,
      }));

      const key = getStorageKey(targetRole);
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } else {
      // Clear all sessions if no specific role is specified
      setSessions({
        admin: null,
        student: null,
        teacher: null,
      });

      ["admin", "student", "teacher"].forEach((role) => {
        const key = getStorageKey(role);
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });

      localStorage.removeItem("praksha_auth");
      sessionStorage.removeItem("praksha_auth");
    }
  };

  const adminUser = sessions.admin;
  const studentUser = sessions.student;
  const teacherUser = sessions.teacher;

  // For backward compatibility: generic active user (student takes priority for public/student components)
  const user = studentUser || adminUser || teacherUser || null;

  const value = useMemo(
    () => ({
      user,
      sessions,
      adminUser,
      studentUser,
      teacherUser,
      isAuthenticated: Boolean(user),
      isAdminAuthenticated: Boolean(adminUser),
      isStudentAuthenticated: Boolean(studentUser),
      isTeacherAuthenticated: Boolean(teacherUser),
      role: user?.role ?? null,
      getRoleUser: (role) => sessions[role] || null,
      isRoleAuthenticated: (role) => Boolean(sessions[role]),
      login,
      logout,
    }),
    [sessions, adminUser, studentUser, teacherUser, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
};

export default AuthContext;