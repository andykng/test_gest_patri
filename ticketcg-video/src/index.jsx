import { registerRoot, Composition } from 'remotion';
import { TicketCGVideo } from './TicketCGVideo';

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="TicketCGVideo"
        component={TicketCGVideo}
        durationInFrames={1800}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};

registerRoot(RemotionRoot);
