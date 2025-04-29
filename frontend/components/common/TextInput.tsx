import { Input } from "@/components/ui/input"

interface Config {
    type: string;
    label: string;
    placeholder: string;
}

interface Props {
    config: Config[];
}

export default function TextInput({ config }: Props) {
  return (
    <>
    {config.map(({ type, label, placeholder }) => (
        <div>
            <Input type={type} placeholder={placeholder} />
        </div>
    ))}
    </>
  )
};
