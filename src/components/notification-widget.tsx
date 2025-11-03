"use client";

import * as Popover from "@radix-ui/react-popover";
import { Bell, Trophy, Target } from "lucide-react";
import { useNotifications } from "@/contexts/notification-context";

export function NotificationWidget() {
  const { notifications, markAsRead } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="relative p-2 hover:bg-zinc-800/50 rounded-full transition-colors">
          <Bell size={20} className="text-zinc-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-violet-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-80 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-50"
          sideOffset={5}
        >
          <div className="p-4">
            <h3 className="text-white font-medium mb-2">Notificações</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-zinc-400 text-sm">
                  Nenhuma notificação no momento.
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      notification.read
                        ? "bg-zinc-800/50 border-zinc-700"
                        : "bg-zinc-800 border-zinc-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.type === "achievement" && (
                        <Trophy
                          size={18}
                          className="text-yellow-500 mt-0.5 shrink-0"
                        />
                      )}
                      {notification.type === "tip" && (
                        <Target
                          size={18}
                          className="text-violet-500 mt-0.5 shrink-0"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-white">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-zinc-400 mt-1">
                          {notification.message}
                        </p>
                        <time className="text-xs text-zinc-500 mt-2 block">
                          {new Date(notification.timestamp).toLocaleString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "short",
                            }
                          )}
                        </time>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <Popover.Arrow className="fill-zinc-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
