package rock.paper.scissors.utils;

import java.util.Collection;

public class Utils {
  /**
   * Gets a random int between [min, max], both included
   *
   * @param min lower bound
   * @param max upper bound
   * @return random int between [min, max], both included
   */
  public static int getRandom(int min, int max) {
    return (int) Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Checks if a collection is not null and not empty
   *
   * @param list list to check
   * @return true if a list is not null and not empty
   */
  public static <T> boolean isCollectionNotEmpty(Collection<T> list) {
    return list != null && !list.isEmpty();
  }
}
