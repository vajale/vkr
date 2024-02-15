import React from "react"

import { TITLES } from "../constants"

import { AccountButton } from "../AccountButton"

export const NotLoggedUser: React.FC = () => {
  return <AccountButton image={""} accountName={TITLES.LOG_IN} />
}
