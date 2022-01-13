import { parseISO, format } from "date-fns"
import fr from "date-fns/locale/fr"

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      {format(date, "H mm", { locale: fr }).replace(" ", "h")}
    </time>
  )
}
