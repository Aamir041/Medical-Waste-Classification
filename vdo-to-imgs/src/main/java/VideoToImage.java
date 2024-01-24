import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class VideoToImage {
    public static void main(String[] args) throws Exception {
        String videoPath = "../sample-data/sample.mp4";
        String imagePath = "../sample-output/";
        convertVideToJPG(videoPath,imagePath,"jpg",25);
    }
    public static void convertVideToJPG(String mp4Path, String imagePath, String imgType, int frameJump) throws Exception, IOException
    {
        Java2DFrameConverter converter = new Java2DFrameConverter();
        FFmpegFrameGrabber frameGrabber = new FFmpegFrameGrabber(mp4Path);
        frameGrabber.start();
        Frame frame;
        double frameRate=frameGrabber.getFrameRate();
        int imgNum=0;
        System.out.println("Video has "+frameGrabber.getLengthInFrames()+" frames and has frame rate of "+frameRate);
        try {
            for(int ii=1;ii<=frameGrabber.getLengthInFrames();ii++){
                imgNum++;
                frameGrabber.setFrameNumber(ii);
                frame = frameGrabber.grab();
                BufferedImage bi = converter.convert(frame);
                String path = imagePath+ File.separator+imgNum+".jpg";
                ImageIO.write(bi,imgType, new File(path));
                ii+=frameJump;
            }
            frameGrabber.stop();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
