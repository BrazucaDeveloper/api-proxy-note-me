type AnyFunction = (...args: any[]) => any
  
export function tryCatchWrapper<Args extends any[], R>(
  handler: (...args: Args) => Promise<R>
): (...args: Args) => Promise<[R | null, Error | null]>;

export function tryCatchWrapper<Args extends any[], R>(
  handler: (...args: Args) => R
): (...args: Args) => [R | null, Error | null];

export function tryCatchWrapper(handler: AnyFunction) {
  return (...args: any[]) => {
    try {
      const data = handler(...args)
      
      if (data instanceof Promise)
        return data
          .then((resolvedData) => [resolvedData, null])
          .catch((e) => [null, getError(e)])
      
      return [data, null]
    } catch (e) {
      return [null, getError(e)]
    }
  }
}

const getError = (e: unknown): Error => {
  const errorMoment = new Date()
  const error = e instanceof Error ? e : new Error(String(e))
    
  console.error(`!> [ERROR LOG - AT ${errorMoment.getHours()}:${errorMoment.getMinutes()}:${errorMoment.getSeconds()}] - ${error.name}`)
  console.log(`!> Error message: ${error.message}`)
  console.log(`!> Stack trace: ${error.stack}`)

  return error
}
