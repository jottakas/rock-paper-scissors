package rock.paper.scissors.utils;

import java.util.HashMap;
import java.util.Map;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Logging aspect copied from
 * https://medium.com/@KosteRico/spring-aop-in-2021-level-up-your-logging-8d1498242ba2
 *
 */
@Aspect
@Component
public class LoggingAspect {
  private final Logger logger = LoggerFactory.getLogger(getClass());

  @Autowired
  private ObjectMapper mapper;

  @Pointcut("(within(rock.paper.scissors.controller.*) || within(rock.paper.scissors.business.*) || within(rock.paper.scissors.entities.*))"
      + "&& execution(public * *(..))")
  public void pointcut() {
  }

  @Before("pointcut()")
  public void logMethod(JoinPoint joinPoint) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();

    Map<String, Object> parameters = getParameters(joinPoint);

    try {
      logger.info("==> class: {}, method(s): {}, arguments: {} ",
          joinPoint.getSignature().getDeclaringTypeName(), signature.getName(), mapper.writeValueAsString(parameters));
    } catch (JsonProcessingException e) {
      logger.error("Error while converting", e);
    }
  }

  /**
   * Log after the return. Currently not working
   */
  @AfterReturning(pointcut = "pointcut()", returning = "entity")
  public void logMethodAfter(JoinPoint joinPoint, ResponseEntity<?> entity) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();

    try {
      logger.info("<== class: {}, method(s): {}, retuning: {}",
          joinPoint.getSignature().getDeclaringTypeName(), signature.getName(), mapper.writeValueAsString(entity));
    } catch (JsonProcessingException e) {
      logger.error("Error while converting", e);
    }
  }

  private Map<String, Object> getParameters(JoinPoint joinPoint) {
    CodeSignature signature = (CodeSignature) joinPoint.getSignature();

    HashMap<String, Object> map = new HashMap<>();

    String[] parameterNames = signature.getParameterNames();

    for (int i = 0; i < parameterNames.length; i++) {
      map.put(parameterNames[i], joinPoint.getArgs()[i]);
    }

    return map;
  }
}
