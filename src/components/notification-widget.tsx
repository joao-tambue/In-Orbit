"use client";

import * as Popover from "@radix-ui/react-popover";
import { Bell, Trophy, Target, Lightbulb, Trash2, X } from "lucide-react";
import { useNotifications } from "@/contexts/notification-context";

export function NotificationWidget() {
  const {
    notifications,
    markAsRead,
    clearNotification,
    clearAll,
  } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  const handleClearAll = () => {
    if (notifications.length === 0) return;
    clearAll();
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
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-medium">Notificações</h3>

              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1"
                >
                  <Trash2 size={12} /> Limpar todas
                </button>
              )}
            </div>

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
                    className={`relative p-3 rounded-lg border transition-colors group ${
                      notification.read
                        ? "bg-zinc-800/50 border-zinc-700"
                        : "bg-zinc-800 border-zinc-600"
                    }`}
                  >
                    {/* botão de remover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(notification.id);
                      }}
                      className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 transition"
                    >
                      <X size={14} />
                    </button>

                    <div className="flex items-start gap-3">
                      {notification.type === "achievement" && (
                        <Trophy
                          size={18}
                          className="text-yellow-500 mt-0.5 shrink-0"
                        />
                      )}
                      {notification.type === "tip" && (
                        <Lightbulb
                          size={18}
                          className="text-violet-400 mt-0.5 shrink-0"
                        />
                      )}
                      {notification.type === "reminder" && (
                        <Target
                          size={18}
                          className="text-blue-400 mt-0.5 shrink-0"
                        />
                      )}

                      <div className="pr-4">
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
