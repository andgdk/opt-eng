/**
 * Represents a filter type used in the ND Filter Solver.
 *
 * @interface Filter
 * @property {string} textLabel Text label for the filter type.
 * @property {number} transmission Transmission value [%] of the filter type.
 * @property {number} available Available number [int] of the filters of this type.
 */
export interface Filter {
  textLabel: string;
  transmission: number;
  available: number;
}

/**
 * Represents a detector used dn the ND Filter Solver.
 *
 * @interface Detector
 * @property {string} type Type for the detector defined by DetectorType.
 * @property {string} textLabel Text label for the detector.
 */
export interface Detector<T extends DetectorType[]> {
  type: T[number]['typeId'];
  textLabel?: string;
}

/**
 * Represents a type of detector with specific properties.
 *
 * @interface DetectorType
 * @property {string} typeId The identifier for the detector type.
 * @property {string} textLabel The text label associated with the detector type.
 * @property {number} targetReadingMin The minimum target reading value [arbitrary cnt] for the detector.
 * @property {number} targetReadingMax The maximum target reading value [arbitrary cnt] for the detector.
 */
export interface DetectorType {
  typeId: string;
  textLabel: string;
  targetReadingMin: number;
  targetReadingMax: number;
}
