import { format } from "date-fns"
import { id } from "date-fns/locale";

export const formatDate = (date: string | undefined | null) => {
    return format(new Date(date || ""), "EEEE, d MMMM yyyy", {
        locale: id,
      });
}