import { z } from "zod";

type ActionResult<T> = {status: 'success', data: T} 
    | {status: 'error', error: string | z.core.$ZodIssue[]}