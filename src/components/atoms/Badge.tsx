import React from "react";

interface BadgeProps {
 title: string;
 className?: string;
}

export default function Badge(props: BadgeProps) {
 return (
  <div>
   <span>{props.title}</span>
  </div>
 );
}
