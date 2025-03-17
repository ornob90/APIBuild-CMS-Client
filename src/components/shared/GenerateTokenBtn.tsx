"use client";
import { ApiStatus } from "@/types/globals.types";
import { Button } from "@heroui/button";
import React, { useState } from "react";

const GenerateTokenBtn = () => {
  // states
  const [tokenCreationStatus, setTokenCreationStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  );

  const handleGenerateToken = () => {
    
  }

  return <Button className=" bg-white text-black">Generate Token</Button>;
};

export default GenerateTokenBtn;
