"use client";

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";

interface CopyLinkProps {
  children: string;
}

const CopyLink = ({ children }: CopyLinkProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <button onClick={handleCopy} className=" w-fit bg-transparent">
      {copied ? <FaCheckCircle  size={20} className="" /> : <IoCopy size={20} />}
    </button>
  );
};

export default CopyLink;
