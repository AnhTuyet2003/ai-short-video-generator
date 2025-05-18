"use client"
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

function Provider({ children }) {
    const { user } = useUser();
    useEffect(() => {
        if (user) {
            const payload = {
            name: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
            imageUrl: user.imageUrl,
            };

            fetch("/api/new-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            });
        }
    }, [user]);

  return <div>{children}</div>;
}

export default Provider;