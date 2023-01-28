import {
  MUTATION_PROGRESS_ERROR,
  MUTATION_PROGRESS_IN_PROGRESS,
  MUTATION_PROGRESS_OK
} from '@/store/const-mutations';

// payload.noProgress = нужно для того, чтобы можно было делать композицию из ACTIONs. Не устанавливает признаки загрузки, ошибок и т.д.
// payload.tag = метка для компонентов загрузчиков
export async function processActionAsync (context, payload, func) {
  try {
    if (payload && payload.noProgress) {
      return await func();
    }
  }
  catch (error) {
    context.commit(MUTATION_PROGRESS_ERROR, {
      tag: payload && payload.tag,
      error: error
    });
    throw error;
  }

  context.commit(MUTATION_PROGRESS_IN_PROGRESS, payload && payload.tag);

  try {
    const result = await func();
    context.commit(MUTATION_PROGRESS_OK, payload && payload.tag);
    return result;
  }
  catch (error) {
    context.commit(MUTATION_PROGRESS_ERROR, {
      tag: payload && payload.tag,
      error: error
    });
    throw error;
  }
}

