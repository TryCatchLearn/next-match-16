import { Loader, Trash } from "lucide-react";

type Props = {
    loading: boolean;
}

export default function DeleteButton({loading}: Props) {
  return (
    <div className="hover:opacity-80 transition cursor-pointer">
        {!loading ? (
            <Trash 
                size={28}
                color='white'
                className='fill-red-600'
            />
        ) : (
            <Loader size={28} className="animate-spin" />
        )}
    </div>
  )
}