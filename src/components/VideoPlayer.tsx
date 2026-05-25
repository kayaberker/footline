type Props = {
  youtubeId: string;
  title: string;
};

export default function VideoPlayer({ youtubeId, title }: Props) {
  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-green-950">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
}
