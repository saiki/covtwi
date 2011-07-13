import java.applet.Applet;
import java.awt.*;
import java.net.*;
import java.io.*;
import java.util.*;

public class HttpApplet extends Applet {
    
    public String get(String slug, String callback) {
        String ret = null;
		String strUrl = "http://api.twitter.com/1/users/suggestions/"+slug+".json?callback=?";

		try {
			URL url = new URL("http://api.twitter.com/1/users/suggestions/"+slug+".json?callback=?");
			HttpURLConnection urlcon = (HttpURLConnection)url.openConnection();
			urlcon.setRequestMethod("GET");
			BufferedReader reader = new BufferedReader(new InputStreamReader(urlcon.getInputStream()));
			StringBuffer sb = new StringBuffer();
			for (String line = reader.readLine(); line != null; line = reader.readLine()) {
				sb.append(line);
			}
			ret = callback+"("+sb.toString()+")";
		} catch (Exception ex) {
			ret = strUrl +"\n";
			ret += ex.getMessage();
		}
        return ret;
    }
}
