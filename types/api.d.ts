/**
 * Internal dependencies
 */
import { API_PATH } from '@constants/api';

type ApiPath = (typeof API_PATH)[keyof typeof API_PATH];
