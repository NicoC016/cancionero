import { getIcon } from "@/app/utils/song.helper"


export default function Icons({icon, name}:{icon:string, name:string}) {

    const Icon = getIcon(icon);
    return (
        <span key={name} className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
        </span>
    )
}
