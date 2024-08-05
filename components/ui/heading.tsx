interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-4xl text-center font-bold tracking-tight">{title}</h1>
      <p className="text-lg text-center font-medium mt-2">{description}</p>
    </div>
  );
};
