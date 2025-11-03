"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "achievement" | "reminder" | "tip";
  read: boolean;
  timestamp: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void;
  markAsRead: (id: string) => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "CLEAR_NOTIFICATION"; payload: string }
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | { type: "CLEAR_ALL" };

function notificationReducer(state: Notification[], action: NotificationAction): Notification[] {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [action.payload, ...state].slice(0, 20); // 🔒 mantém no máximo 20
    case "MARK_AS_READ":
      return state.map((n) => (n.id === action.payload ? { ...n, read: true } : n));
    case "CLEAR_NOTIFICATION":
      return state.filter((n) => n.id !== action.payload);
    case "SET_NOTIFICATIONS":
      return action.payload;
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  // 🧠 Carrega notificações persistidas ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      try {
        const parsed: Notification[] = JSON.parse(stored);
        dispatch({ type: "SET_NOTIFICATIONS", payload: parsed });
      } catch {
        localStorage.removeItem("notifications");
      }
    }
  }, []);

  // 💾 Salva notificações sempre que muda
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      read: false,
      timestamp: new Date().toISOString(),
    };

    dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });

    // 🔔 Mostra toast visual
    toast(notification.message, {
      icon:
        notification.type === "achievement"
          ? "🏆"
          : notification.type === "tip"
          ? "💡"
          : "🔔",
      style: {
        background: "#18181b",
        color: "#fff",
        border: "1px solid #3f3f46",
      },
    });
  };

  const markAsRead = (id: string) => dispatch({ type: "MARK_AS_READ", payload: id });

  const clearNotification = (id: string) => dispatch({ type: "CLEAR_NOTIFICATION", payload: id });

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
    localStorage.removeItem("notifications");
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications deve ser usado dentro de NotificationProvider");
  }
  return context;
}
