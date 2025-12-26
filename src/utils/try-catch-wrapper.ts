// Wrapper para o try...catch... como sobregarga de funções
type AnyFunction = (...args: any[]) => any
  
// Sobrecarga 1: Para funções assíncronas (retornam Promise)
export function tryCatchWrapper<Args extends any[], R>(
  handler: (...args: Args) => Promise<R>
): (...args: Args) => Promise<[R | null, Error | null]>;

// Sobrecarga 2: Para funções síncronas
export function tryCatchWrapper<Args extends any[], R>(
  handler: (...args: Args) => R
): (...args: Args) => [R | null, Error | null];

// Implementação única que decide o que fazer em tempo de execução
export function tryCatchWrapper(handler: AnyFunction) {
  return (...args: any[]) => {
    try {
      const data = handler(...args)
      
      if (data instanceof Promise) {
        return data
          .then((resolvedData) => [resolvedData, null])
          .catch((e) => [ null, e instanceof Error ? e : new Error(String(e)) ]);
      }
      
      return [data, null]
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e))
      return [null, error]
    }
  }
}
