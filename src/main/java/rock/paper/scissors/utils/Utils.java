package rock.paper.scissors.utils;

import java.util.List;

public class Utils {
  /**
   * Gets a random int between [min, max] both included
   *
   * @param min lower bound
   * @param max upper bound
   * @return random int
   */
  public static int getRandom(int min, int max) {
    return (int) Math.floor(Math.random() * (max - min + 1) + min);
  }

  public static <T> boolean isListNotEmpty(List<T> list) {
    return list != null && !list.isEmpty();
  }
}
